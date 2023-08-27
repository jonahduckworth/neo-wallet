interface AuthPageProps {
  onLogin: (userId: string) => void;
}

interface LoginFormProps {
  formData: AuthFormData;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
}

interface SignUpFormProps {
  formData: AuthFormData;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
}

interface AuthFormData {
  username?: string; // Optional for login form
  email: string;
  password: string;
}

export type { AuthPageProps, LoginFormProps, SignUpFormProps, AuthFormData };