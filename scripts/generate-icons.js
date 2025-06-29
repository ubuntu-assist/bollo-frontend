const sharp = require('sharp')
const fs = require('fs')
const path = require('path')

const iconSizes = [72, 96, 128, 144, 152, 192, 384, 512]
const inputSvg = path.join(__dirname, '../public/icons/icon.svg')
const outputDir = path.join(__dirname, '../public/icons')

async function generateIcons() {
  try {
    const svgBuffer = fs.readFileSync(inputSvg)

    for (const size of iconSizes) {
      const outputPath = path.join(outputDir, `icon-${size}x${size}.png`)

      await sharp(svgBuffer).resize(size, size).png().toFile(outputPath)

      console.log(`Generated ${size}x${size} icon`)
    }

    console.log('All icons generated successfully!')
  } catch (error) {
    console.error('Error generating icons:', error)
  }
}

generateIcons()
