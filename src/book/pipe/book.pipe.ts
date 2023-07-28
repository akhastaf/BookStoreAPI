import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from "@nestjs/common";
import { join } from "path";
import * as sharp from "sharp";
import { CreateImageDto } from "src/image/dto/createImage.dto";
import { v4 as uuidv4} from "uuid";

@Injectable()
export class BookImagesPipe implements PipeTransform<Express.Multer.File[], Promise<CreateImageDto[]>> {
    async transform(images: Express.Multer.File[]): Promise<CreateImageDto[]> {
        try {
            console.log(images)
            if (images.length) {
                const imagesDto = images.map(async (image) => {
                    if (!image.mimetype.startsWith('image/'))
                    throw new BadRequestException('Invalid file type. Only images are allowed.')
                    const file_name = `/${uuidv4()}.webp`
                    console.log(__dirname)
                    const file_path = join(__dirname, `../../../client${file_name}`)
                    const resizedImageBuffer = await sharp(image.buffer)
                    .resize(250, 250)
                    .grayscale()
                    .webp({ effort: 3})
                    .toFile(file_path)
        
                    return {
                        file_path: file_name,
                        width: 250,
                        height: 250
                    }
                })
                return Promise.all(imagesDto)
            }
        } catch (error) {
            throw error
        }
    }

}