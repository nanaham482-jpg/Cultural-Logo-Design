export interface Message {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  timestamp: Date;
  type?: "text" | "image-list" | "image-selection" | "logo-result";
  data?: {
    images?: OSSImage[];
    selectedImage?: OSSImage;
    generatedLogo?: string;
    keywords?: string[];
  };
}

export interface OSSImage {
  url: string;
  name: string;
  tags: string[];
}

export interface ChatState {
  messages: Message[];
  selectedImage: OSSImage | null;
  isLoading: boolean;
  currentStep: "input" | "selecting" | "generating" | "complete";
}

