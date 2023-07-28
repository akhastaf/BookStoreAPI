import { BadRequestException, PipeTransform } from "@nestjs/common"
import { join } from "path"
import * as sharp from "sharp"
import { CreateImageDto } from "src/image/dto/createImage.dto"
import { v4 as uuidv4} from "uuid"

export class PromotionImagePipe  implements PipeTransform<Express.Multer.File, Promise<CreateImageDto[]|void>> {
    async transform(image: Express.Multer.File): Promise<CreateImageDto[]> {
        try {
            if (image) {
                if (!image.mimetype.startsWith('image/'))
                    throw new BadRequestException('Invalid file type. Only images are allowed.')
                const file_name = uuidv4()
                const file_path = join(__dirname, `../../../client/${file_name}`)
                const imageBuffer = sharp(image.buffer)
                .webp({ effort: 3})
                
                console.log(file_path)
                console.log(join(__dirname, `${file_path}-larger.webp`))
                const larger = await sharp(image.buffer)
                .webp({ effort: 3})
                .resize(1440, 900)
                .toFile(`${file_path}-larger.webp`)
                const larg = await sharp(image.buffer)
                .webp({ effort: 3})
                .webp({ effort: 3})
                .toFile(`${file_path}-larg.webp`)
                const meduim = await sharp(image.buffer)
                .webp({ effort: 3})
                .resize(1280, 720)
                .toFile(`${file_path}-meduim.webp`)
                const small = await sharp(image.buffer)
                .webp({ effort: 3})
                .resize(640, 480)
                .toFile(`${file_path}-small.webp`)
                const images = [
                    {
                        file_path: `${file_path}-larger.webp`,
                        width: 1440,
                        height: 900
                    },
                    {
                        file_path: `${file_path}-large.webp`,
                        width: 1920,
                        height: 1080
                    },
                    {
                        file_path: `${file_path}-meduim.webp`,
                        width: 1280,
                        height: 720
                    },
                    {
                        file_path: `${file_path}-small.webp`,
                        width: 640,
                        height: 480
                    },
                ]
                console.log(images)
                return images
            }
        } catch (error) {
            throw error
        }
    }
}