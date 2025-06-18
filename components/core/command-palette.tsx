'use client'

import { useState, useCallback, useMemo, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Search,
  Command,
  ArrowRight,
  Plus,
  Users,
  FileText,
  Settings,
  Home,
  User,
  LogOut,
  Bell,
  Heart,
  MapPin,
  DollarSign,
  Calendar,
  MessageSquare,
  Star,
  Briefcase,
  Phone,
  Mail,
  HelpCircle,
  Zap,
} from 'lucide-react'

// Structure de nœud du Trie pour la recherche optimisée
class TrieNode {
  children: Map<string, TrieNode> = new Map()
  isEndOfWord: boolean = false
  commands: CommandItem[] = []
}

// Trie optimisé pour la recherche de commandes
class CommandTrie {
  private root: TrieNode = new TrieNode()

  insert(word: string, command: CommandItem): void {
    let current = this.root

    for (const char of word.toLowerCase()) {
      if (!current.children.has(char)) {
        current.children.set(char, new TrieNode())
      }
      current = current.children.get(char)!

      // Ajouter la commande à ce nœud si elle n'existe pas déjà
      if (!current.commands.find((cmd) => cmd.id === command.id)) {
        current.commands.push(command)
      }
    }

    current.isEndOfWord = true
  }

  search(prefix: string, maxResults = 8): CommandItem[] {
    if (!prefix.trim()) return []

    let current = this.root

    for (const char of prefix.toLowerCase()) {
      if (!current.children.has(char)) {
        return []
      }
      current = current.children.get(char)!
    }

    // Retourner les commandes triées par priorité et popularité
    return current.commands
      .sort((a, b) => {
        // Priorité d'abord, puis popularité
        if (a.priority !== b.priority) {
          return a.priority - b.priority
        }
        return b.popularity - a.popularity
      })
      .slice(0, maxResults)
  }
}

interface CommandItem {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  category: string
  action: () => void
  url?: string
  shortcut?: string
  keywords: string[]
  priority: number // 1 = haute priorité, 5 = basse priorité
  popularity: number // Score de popularité
}

interface CommandPaletteProps {
  isOpen: boolean
  onClose: () => void
}

const CommandPalette: React.FC<CommandPaletteProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  // Commandes disponibles dans l'app
  const commands: CommandItem[] = useMemo(
    () => [
      // Navigation principale
      {
        id: 'nav-home',
        title: 'Go to Home',
        description: 'Navigate to the home page',
        icon: <Home className='w-4 h-4' />,
        category: 'Navigation',
        action: () => (window.location.href = '/'),
        url: '/',
        shortcut: 'G H',
        keywords: ['home', 'dashboard', 'main'],
        priority: 1,
        popularity: 95,
      },
      {
        id: 'nav-services',
        title: 'Browse Services',
        description: 'Explore all available services',
        icon: <Briefcase className='w-4 h-4' />,
        category: 'Navigation',
        action: () => (window.location.href = '/services'),
        url: '/services',
        keywords: ['services', 'browse', 'explore'],
        priority: 1,
        popularity: 88,
      },
      {
        id: 'nav-workers',
        title: 'Find Workers',
        description: 'Search for skilled workers',
        icon: <Users className='w-4 h-4' />,
        category: 'Navigation',
        action: () => (window.location.href = '/find-workers'),
        url: '/find-workers',
        keywords: ['workers', 'taskers', 'find', 'skilled'],
        priority: 1,
        popularity: 82,
      },

      // Actions principales
      {
        id: 'action-post-task',
        title: 'Post a New Task',
        description: 'Create and publish a new task',
        icon: <Plus className='w-4 h-4' />,
        category: 'Actions',
        action: () => (window.location.href = '/post-task'),
        url: '/post-task',
        shortcut: 'Ctrl+N',
        keywords: ['post', 'task', 'create', 'new', 'job'],
        priority: 1,
        popularity: 92,
      },
      {
        id: 'action-become-tasker',
        title: 'Become a Tasker',
        description: 'Join as a service provider',
        icon: <Star className='w-4 h-4' />,
        category: 'Actions',
        action: () => (window.location.href = '/become-tasker'),
        url: '/become-tasker',
        keywords: ['become', 'tasker', 'provider', 'join', 'earn'],
        priority: 2,
        popularity: 75,
      },

      // Compte utilisateur
      {
        id: 'account-profile',
        title: 'My Profile',
        description: 'View and edit your profile',
        icon: <User className='w-4 h-4' />,
        category: 'Account',
        action: () => (window.location.href = '/profile'),
        url: '/profile',
        shortcut: 'G P',
        keywords: ['profile', 'account', 'personal', 'edit'],
        priority: 2,
        popularity: 70,
      },
      {
        id: 'account-tasks',
        title: 'My Tasks',
        description: 'Manage your posted tasks',
        icon: <FileText className='w-4 h-4' />,
        category: 'Account',
        action: () => (window.location.href = '/my-tasks'),
        url: '/my-tasks',
        keywords: ['tasks', 'my', 'manage', 'posted'],
        priority: 2,
        popularity: 78,
      },
      {
        id: 'account-messages',
        title: 'Messages',
        description: 'View your conversations',
        icon: <MessageSquare className='w-4 h-4' />,
        category: 'Account',
        action: () => (window.location.href = '/messages'),
        url: '/messages',
        shortcut: 'G M',
        keywords: ['messages', 'chat', 'conversations', 'inbox'],
        priority: 2,
        popularity: 65,
      },
      {
        id: 'account-notifications',
        title: 'Notifications',
        description: 'Check your notifications',
        icon: <Bell className='w-4 h-4' />,
        category: 'Account',
        action: () => (window.location.href = '/notifications'),
        url: '/notifications',
        keywords: ['notifications', 'alerts', 'updates'],
        priority: 3,
        popularity: 55,
      },

      // Finances
      {
        id: 'finance-payments',
        title: 'Payment Methods',
        description: 'Manage your payment options',
        icon: <DollarSign className='w-4 h-4' />,
        category: 'Finance',
        action: () => (window.location.href = '/payments'),
        url: '/payments',
        keywords: ['payment', 'methods', 'cards', 'billing'],
        priority: 3,
        popularity: 45,
      },
      {
        id: 'finance-earnings',
        title: 'My Earnings',
        description: 'View your earnings and payouts',
        icon: <Zap className='w-4 h-4' />,
        category: 'Finance',
        action: () => (window.location.href = '/earnings'),
        url: '/earnings',
        keywords: ['earnings', 'money', 'payouts', 'income'],
        priority: 3,
        popularity: 60,
      },

      // Support et aide
      {
        id: 'support-help',
        title: 'Help Center',
        description: 'Find answers to common questions',
        icon: <HelpCircle className='w-4 h-4' />,
        category: 'Support',
        action: () => (window.location.href = '/help'),
        url: '/help',
        keywords: ['help', 'support', 'faq', 'questions'],
        priority: 4,
        popularity: 40,
      },
      {
        id: 'support-contact',
        title: 'Contact Support',
        description: 'Get in touch with our team',
        icon: <Phone className='w-4 h-4' />,
        category: 'Support',
        action: () => (window.location.href = '/contact'),
        url: '/contact',
        keywords: ['contact', 'support', 'help', 'team'],
        priority: 4,
        popularity: 35,
      },

      // Paramètres
      {
        id: 'settings-general',
        title: 'Settings',
        description: 'Configure your preferences',
        icon: <Settings className='w-4 h-4' />,
        category: 'Settings',
        action: () => (window.location.href = '/settings'),
        url: '/settings',
        shortcut: 'Ctrl+,',
        keywords: ['settings', 'preferences', 'config', 'options'],
        priority: 3,
        popularity: 50,
      },
      {
        id: 'action-logout',
        title: 'Sign Out',
        description: 'Logout from your account',
        icon: <LogOut className='w-4 h-4' />,
        category: 'Account',
        action: () => {
          // Logique de déconnexion
          console.log('Signing out...')
        },
        keywords: ['logout', 'sign out', 'disconnect', 'exit'],
        priority: 5,
        popularity: 25,
      },
    ],
    []
  )

  // Construction du Trie pour la recherche optimisée
  const commandTrie = useMemo(() => {
    const trie = new CommandTrie()

    commands.forEach((command) => {
      // Index par titre
      trie.insert(command.title, command)

      // Index par mots-clés
      command.keywords.forEach((keyword) => {
        trie.insert(keyword, command)
      })

      // Index par catégorie
      trie.insert(command.category, command)

      // Index par mots de la description
      const descWords = command.description.toLowerCase().split(/\s+/)
      descWords.forEach((word) => {
        if (word.length > 2) {
          trie.insert(word, command)
        }
      })
    })

    return trie
  }, [commands])

  // Recherche avec le Trie
  const searchResults = useMemo(() => {
    if (!query.trim()) {
      // Retourner les commandes les plus populaires par défaut
      return commands
        .sort((a, b) => {
          if (a.priority !== b.priority) {
            return a.priority - b.priority
          }
          return b.popularity - a.popularity
        })
        .slice(0, 8)
    }

    return commandTrie.search(query, 8)
  }, [query, commandTrie, commands])

  // Gestion du clavier
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault()
          setSelectedIndex((prev) =>
            Math.min(prev + 1, searchResults.length - 1)
          )
          break
        case 'ArrowUp':
          e.preventDefault()
          setSelectedIndex((prev) => Math.max(prev - 1, 0))
          break
        case 'Enter':
          e.preventDefault()
          if (searchResults[selectedIndex]) {
            executeCommand(searchResults[selectedIndex])
          }
          break
        case 'Escape':
          onClose()
          break
      }
    },
    [searchResults, selectedIndex, onClose]
  )

  const executeCommand = (command: CommandItem) => {
    command.action()
    onClose()
    setQuery('')
    setSelectedIndex(0)
  }

  // Focus automatique quand le palette s'ouvre
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  // Reset de la sélection quand la query change
  useEffect(() => {
    setSelectedIndex(0)
  }, [query])

  // Reset quand on ferme
  useEffect(() => {
    if (!isOpen) {
      setQuery('')
      setSelectedIndex(0)
    }
  }, [isOpen])

  // Disable page scroll when palette is open
  useEffect(() => {
    if (isOpen) {
      // Save current scroll position
      const scrollY = window.scrollY

      // Prevent body scroll
      document.body.style.position = 'fixed'
      document.body.style.top = `-${scrollY}px`
      document.body.style.width = '100%'
      document.body.style.overflow = 'hidden'

      return () => {
        // Restore body scroll
        document.body.style.position = ''
        document.body.style.top = ''
        document.body.style.width = ''
        document.body.style.overflow = ''

        // Restore scroll position
        window.scrollTo(0, scrollY)
      }
    }
  }, [isOpen])

  const getCategoryColor = (category: string) => {
    const colors = {
      Navigation: 'bg-blue-100 text-blue-800',
      Actions: 'bg-green-100 text-green-800',
      Account: 'bg-purple-100 text-purple-800',
      Finance: 'bg-yellow-100 text-yellow-800',
      Support: 'bg-orange-100 text-orange-800',
      Settings: 'bg-gray-100 text-gray-800',
    }
    return (
      colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800'
    )
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className='fixed inset-0 z-50 flex items-start justify-center pt-20'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* Overlay */}
          <motion.div
            className='absolute inset-0 bg-black/50 backdrop-blur-sm'
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Command Palette */}
          <motion.div
            className='relative w-full max-w-2xl mx-4 bg-white rounded-2xl shadow-2xl overflow-hidden'
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            {/* Header avec input de recherche */}
            <div className='flex items-center p-4 border-b border-gray-200'>
              <Search className='w-5 h-5 text-gray-400 mr-3' />
              <input
                ref={inputRef}
                type='text'
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder='Search for commands, pages, and actions...'
                className='flex-1 outline-none text-lg placeholder-gray-400'
              />
              <div className='hidden sm:flex items-center space-x-2 text-xs text-gray-400'>
                <kbd className='px-2 py-1 bg-gray-100 rounded'>↑↓</kbd>
                <span>navigate</span>
                <kbd className='px-2 py-1 bg-gray-100 rounded'>↵</kbd>
                <span>select</span>
                <kbd className='px-2 py-1 bg-gray-100 rounded'>esc</kbd>
                <span>close</span>
              </div>
            </div>

            {/* Résultats */}
            <div className='max-h-96 overflow-y-auto'>
              {searchResults.length > 0 ? (
                <div className='py-2'>
                  {searchResults.map((command, index) => (
                    <motion.div
                      key={command.id}
                      className={`flex items-center px-4 py-3 cursor-pointer transition-colors ${
                        index === selectedIndex
                          ? 'bg-[#1B3B86]/10 border-l-4 border-[#1B3B86]'
                          : 'hover:bg-gray-50'
                      }`}
                      onClick={() => executeCommand(command)}
                      whileHover={{ x: 4 }}
                      transition={{ duration: 0.1 }}
                    >
                      {/* Icône */}
                      <div
                        className={`flex items-center justify-center w-10 h-10 rounded-lg mr-3 ${
                          index === selectedIndex
                            ? 'bg-[#1B3B86] text-white'
                            : 'bg-gray-100 text-gray-600'
                        }`}
                      >
                        {command.icon}
                      </div>

                      {/* Contenu */}
                      <div className='flex-1 min-w-0'>
                        <div className='flex items-center justify-between'>
                          <h3 className='font-medium text-gray-900 truncate'>
                            {command.title}
                          </h3>
                          <div className='flex items-center space-x-2'>
                            {command.shortcut && (
                              <kbd className='hidden sm:inline-block px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded'>
                                {command.shortcut}
                              </kbd>
                            )}
                            <span
                              className={`px-2 py-1 text-xs rounded-full ${getCategoryColor(
                                command.category
                              )}`}
                            >
                              {command.category}
                            </span>
                          </div>
                        </div>
                        <p className='text-sm text-gray-500 truncate mt-1'>
                          {command.description}
                        </p>
                      </div>

                      {/* Flèche */}
                      <ArrowRight
                        className={`w-4 h-4 ml-3 transition-colors ${
                          index === selectedIndex
                            ? 'text-[#1B3B86]'
                            : 'text-gray-400'
                        }`}
                      />
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className='py-12 text-center text-gray-500'>
                  <Command className='w-8 h-8 mx-auto mb-3 text-gray-300' />
                  <p>No commands found for "{query}"</p>
                  <p className='text-sm mt-1'>
                    Try searching for something else
                  </p>
                </div>
              )}
            </div>

            {/* Footer avec tips */}
            <div className='px-4 py-3 bg-gray-50 border-t border-gray-200'>
              <div className='flex items-center justify-between text-xs text-gray-500'>
                <div className='flex items-center space-x-4'>
                  <span>
                    💡 Pro tip: Use keywords like "post", "find", "settings"
                  </span>
                </div>
                <div className='hidden sm:block'>
                  Press{' '}
                  <kbd className='px-1 py-0.5 bg-white rounded border'>
                    Ctrl+B
                  </kbd>{' '}
                  anytime
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default CommandPalette

// Hook pour gérer le command palette
export const useCommandPalette = () => {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl+B ou Cmd+B pour ouvrir le command palette
      if ((e.ctrlKey || e.metaKey) && e.key === 'b') {
        e.preventDefault()
        setIsOpen(true)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  return {
    isOpen,
    openPalette: () => setIsOpen(true),
    closePalette: () => setIsOpen(false),
  }
}
