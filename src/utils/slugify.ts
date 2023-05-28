export function slugify(text: string, id: number): string {
    const slug = text
      .toString()
      .toLowerCase()
      .replace(/\s+/g, '-') // Replace spaces with dashes
      .replace(/[^\w\-]+/g, '') // Remove non-word characters
      .replace(/\-\-+/g, '-') // Replace multiple dashes with single dash
      .replace(/^-+/, '') // Remove leading dash
      .replace(/-+$/, ''); // Remove trailing dash
    
    return `${slug}-${id}`;
}