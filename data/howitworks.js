import { UserCheck, FileText, MessagesSquare, BarChart3 } from "lucide-react";

export const howItWorks = [
  {
    title: "Personalized Onboarding",
    description: "Provide your career details to receive tailored AI-driven guidance.",
    icon: <UserCheck className="w-8 h-8 text-primary" />,
  },
  {
    title: "Generate Your Documents",
    description: "Create AI-optimized resumes and cover letters for better job applications.",
    icon: <FileText className="w-8 h-8 text-primary" />,
  },
  {
    title: "AI Interview Coaching",
    description: "Practice with AI-driven mock interviews and receive instant feedback.",
    icon: <MessagesSquare className="w-8 h-8 text-primary" />,
  },
  {
    title: "Track & Improve",
    description: "Monitor your career growth with analytics and AI recommendations.",
    icon: <BarChart3 className="w-8 h-8 text-primary" />,
  },
];
