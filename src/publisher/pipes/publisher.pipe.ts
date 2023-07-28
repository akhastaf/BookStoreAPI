import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from "@nestjs/common";
import { join } from "path";
import * as sharp from "sharp";
import { CreateImageDto } from "src/image/dto/createImage.dto";
import { uuid as uuidv4} from "uuidv4";

@Injectable()
export class PublisherImagePipe implements PipeTransform<Express.Multer.File, Promise<CreateImageDto|void>> {
    async transform(image: Express.Multer.File): Promise<CreateImageDto> {
        try {
            if (image) {
                if (!image.mimetype.startsWith('image/'))
                    throw new BadRequestException('Invalid file type. Only images are allowed.')
                const file_name = `/${uuidv4()}.webp`
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
            }
        } catch (error) {
            throw error
        }
    }

}