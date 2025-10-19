// src/utils/fileUtils.ts

/**
 * Chuyển file ảnh sang chuỗi Base64.
 * @param file - Đối tượng File do người dùng tải lên.
 * @returns Promise<string> - Chuỗi base64 của ảnh (không bao gồm tiền tố data:image/...).
 */
export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (typeof reader.result === 'string') {
        // Loại bỏ phần đầu "data:image/png;base64," để chỉ lấy phần chuỗi base64
        const base64String = reader.result.split(',')[1];
        resolve(base64String);
      } else {
        reject(new Error('Không thể đọc tệp dưới dạng chuỗi base64.'));
      }
    };

    reader.onerror = (error) => reject(error);

    reader.readAsDataURL(file);
  });
};
