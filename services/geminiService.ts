import { GoogleGenAI, Modality } from "@google/genai";
import { ART_STYLES } from '../constants';
import type { Outfit, Scene } from '../types';
import { fileToBase64 } from '../utils/fileUtils.tsx';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

function buildPrompt(outfit: Outfit, scene: Scene, description: string, style: string): string {
    return `
ABSOLUTE PRIORITY: RETAIN 100% OF THE INPUT IMAGE FACE ID. DO NOT ALTER FACIAL STRUCTURE, EXPRESSION, OR SKIN COLOR.

A Hyper-detailed, Cinematic Portrait of the subject celebrating the Christmas Holiday.

Subject: The person/child is wearing a Luxurious ${outfit}. Focus on high-quality fabrics and intricate details.

Scene: ${scene}. The background features Shallow Depth of Field (Creamy Bokeh), with Glimmering, Warm Light Sources (e.g., fairy lights, candle flames, fireplace glow) creating a deep, magical atmosphere.

Lighting & Mood: Professional Studio Lighting, Soft Golden Hour/Firelight. Essential Rim Lighting (Kicker Light). The overall mood should be elegant, nostalgic, and poetic/festive.

Technical Specs: Shot on a Full-Frame Camera with a Prime Lens F1.2. Hyper-realistic 8K Resolution, ultra-detailed, photorealistic, wide color gamut. NO watermarks, logos, or text.

Specific User Request: ${description}

Art Style: ${style}
    `.trim();
}

export const generateChristmasImages = async (
    imageFile: File,
    outfit: Outfit,
    scene: Scene,
    description: string
): Promise<string[]> => {
    
    const base64Image = await fileToBase64(imageFile);

    const imagePart = {
        inlineData: {
            data: base64Image,
            mimeType: imageFile.type,
        },
    };

    const generationPromises = ART_STYLES.map(style => {
        const prompt = buildPrompt(outfit, scene, description, style);
        
        return ai.models.generateContent({
            model: 'gemini-2.5-flash-image',
            contents: {
                parts: [
                    imagePart,
                    { text: prompt },
                ],
            },
            config: {
                responseModalities: [Modality.IMAGE],
            },
        });
    });

    const responses = await Promise.all(generationPromises);

    const imageUrls = responses.map(response => {
        for (const part of response.candidates[0].content.parts) {
            if (part.inlineData) {
                const base64ImageBytes = part.inlineData.data;
                return `data:${part.inlineData.mimeType};base64,${base64ImageBytes}`;
            }
        }
        throw new Error('No image data found in response from Gemini API.');
    });

    return imageUrls;
};