import { uuid } from "uuidv4"
import slugifyArabic from 'slugify-arabic'


export function slugifyUtil(text: string): string  {
    const uid: string = uuid().substring(0, 8)
    const slug: string = slugifyArabic(text, {remove: /[$*_+~.()'"!\-:@]+/g, replacement: '_'})
    return `${slug}-${uid}`
}


// 	"slug": "دار_الجمل-2885c8e0",
