import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Convert Google Drive share links to direct image URLs that work in <img> tags
 * @param url - Google Drive URL (share link or direct link)
 * @returns Direct image URL or original URL if not a Google Drive link
 */
export function convertGoogleDriveUrl(url: string): string {
  if (!url) return url;

  // Extract file ID from share link: https://drive.google.com/file/d/{FILE_ID}/view
  const shareMatch = url.match(/drive\.google\.com\/file\/d\/([a-zA-Z0-9-_]+)/);
  if (shareMatch && shareMatch[1]) {
    // Thumbnail API works in <img> tags for files shared as "Anyone with the link"
    return `https://drive.google.com/thumbnail?id=${shareMatch[1]}&sz=w2000`;
  }

  // Extract file ID from uc format: https://drive.google.com/uc?id={FILE_ID}
  const ucMatch = url.match(/drive\.google\.com\/uc\?id=([a-zA-Z0-9-_]+)/);
  if (ucMatch && ucMatch[1]) {
    return `https://drive.google.com/thumbnail?id=${ucMatch[1]}&sz=w2000`;
  }

  // Extract file ID from thumbnail format already stored
  const thumbMatch = url.match(/drive\.google\.com\/thumbnail\?id=([a-zA-Z0-9-_]+)/);
  if (thumbMatch && thumbMatch[1]) {
    return `https://drive.google.com/thumbnail?id=${thumbMatch[1]}&sz=w2000`;
  }

  return url;
}

/**
 * Convert Google Drive video links to embeddable preview URLs for iframe
 * @param url - Google Drive URL (share link or direct link)
 * @returns Embeddable video URL or original URL if not a Google Drive link
 */
export function convertGoogleDriveVideoUrl(url: string): string {
  if (!url) return url;

  // Handle Google Drive share link format
  // https://drive.google.com/file/d/{FILE_ID}/view?usp=sharing
  const shareMatch = url.match(/drive\.google\.com\/file\/d\/([a-zA-Z0-9-_]+)/);
  if (shareMatch && shareMatch[1]) {
    // Use preview for iframe embedding
    return `https://drive.google.com/file/d/${shareMatch[1]}/preview`;
  }

  // Handle Google Drive direct preview format
  // https://drive.google.com/file/d/{FILE_ID}/preview
  if (url.includes("drive.google.com/file/d/") && url.includes("/preview")) {
    return url;
  }

  // Handle Google Drive uc format and convert to preview
  const ucMatch = url.match(/drive\.google\.com\/uc\?id=([a-zA-Z0-9-_]+)/);
  if (ucMatch && ucMatch[1]) {
    return `https://drive.google.com/file/d/${ucMatch[1]}/preview`;
  }

  // Return original URL if not a Google Drive link (could be YouTube, Vimeo, etc.)
  return url;
}
