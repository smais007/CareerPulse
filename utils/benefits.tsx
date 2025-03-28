import {
  Heart,
  Syringe,
  DollarSign,
  Home,
  Utensils,
  Dumbbell,
  BookOpen,
  Baby,
  Sun,
  Users,
  Plane,
  Clock,
  Laptop,
  GraduationCap,
  Handshake,
  Gift,
  Wifi,
  Car,
  Shield,
  Bike,
  Coffee,
  Briefcase,
  PieChart,
  Globe,
  Calendar,
  Music,
  Film,
  MessageSquare,
  Zap,
  Award,
  Leaf,
  ClipboardCheck,
  Code,
  Smile,
  BarChart2,
  Cloud,
  Bell,
  Eye,
} from "lucide-react";

interface Benefit {
  id: string;
  label: string;
  icon: React.ReactNode;
}

export const benefits: Benefit[] = [
  {
    id: "medical",
    label: "Medical Insurance",
    icon: <Heart className="size-3" />,
  },
  {
    id: "dental",
    label: "Dental Insurance",
    icon: <Syringe className="size-3" />,
  },
  {
    id: "vision",
    label: "Vision Insurance",
    icon: <Eye className="size-3" />,
  },
  {
    id: "401k",
    label: "401(k) Matching",
    icon: <DollarSign className="size-3" />,
  },
  {
    id: "remote",
    label: "Remote Work Options",
    icon: <Home className="size-3" />,
  },
  {
    id: "meals",
    label: "Free Meals/Snacks",
    icon: <Utensils className="size-3" />,
  },
  {
    id: "fitness",
    label: "Fitness Stipend",
    icon: <Dumbbell className="size-3" />,
  },
  {
    id: "learning",
    label: "Learning Budget",
    icon: <BookOpen className="size-3" />,
  },
  {
    id: "parental",
    label: "Parental Leave",
    icon: <Baby className="size-3" />,
  },
  {
    id: "unlimited",
    label: "Unlimited PTO",
    icon: <Sun className="size-3" />,
  },
  {
    id: "team",
    label: "Team Events",
    icon: <Users className="size-3" />,
  },
  {
    id: "travel",
    label: "Travel Opportunities",
    icon: <Plane className="size-3" />,
  },
  {
    id: "flexible",
    label: "Flexible Hours",
    icon: <Clock className="size-3" />,
  },
  {
    id: "equipment",
    label: "New Equipment",
    icon: <Laptop className="size-3" />,
  },
  {
    id: "tuition",
    label: "Tuition Assistance",
    icon: <GraduationCap className="size-3" />,
  },
  {
    id: "volunteer",
    label: "Volunteer Days",
    icon: <Handshake className="size-3" />,
  },
  {
    id: "bonuses",
    label: "Performance Bonuses",
    icon: <Gift className="size-3" />,
  },
  {
    id: "internet",
    label: "Internet Stipend",
    icon: <Wifi className="size-3" />,
  },
  {
    id: "commuter",
    label: "Commuter Benefits",
    icon: <Car className="size-3" />,
  },
  {
    id: "life-insurance",
    label: "Life Insurance",
    icon: <Shield className="size-3" />,
  },
  {
    id: "bike-to-work",
    label: "Bike-to-Work Program",
    icon: <Bike className="size-3" />,
  },
  {
    id: "coffee",
    label: "Free Coffee & Beverages",
    icon: <Coffee className="size-3" />,
  },
  {
    id: "relocation",
    label: "Relocation Assistance",
    icon: <Briefcase className="size-3" />,
  },
  {
    id: "profit-sharing",
    label: "Profit Sharing",
    icon: <PieChart className="size-3" />,
  },
  {
    id: "remote-global",
    label: "Work from Anywhere (Global)",
    icon: <Globe className="size-3" />,
  },
  {
    id: "sabbatical",
    label: "Paid Sabbatical",
    icon: <Calendar className="size-3" />,
  },
  {
    id: "music",
    label: "Music/Entertainment Stipend",
    icon: <Music className="size-3" />,
  },
  {
    id: "streaming",
    label: "Streaming Subscriptions",
    icon: <Film className="size-3" />,
  },
  {
    id: "therapy",
    label: "Mental Health Support",
    icon: <MessageSquare className="size-3" />,
  },
  {
    id: "energy",
    label: "Energy/Gym Reimbursement",
    icon: <Zap className="size-3" />,
  },
  {
    id: "recognition",
    label: "Employee Recognition Awards",
    icon: <Award className="size-3" />,
  },
  {
    id: "sustainability",
    label: "Sustainability Initiatives",
    icon: <Leaf className="size-3" />,
  },
  {
    id: "onboarding",
    label: "Paid Onboarding Period",
    icon: <ClipboardCheck className="size-3" />,
  },
  {
    id: "tech-conferences",
    label: "Tech Conference Budget",
    icon: <Code className="size-3" />,
  },
  {
    id: "happy-hours",
    label: "Team Happy Hours",
    icon: <Smile className="size-3" />,
  },
  {
    id: "career-growth",
    label: "Career Growth Planning",
    icon: <BarChart2 className="size-3" />,
  },
  {
    id: "cloud-storage",
    label: "Cloud Storage Subsidy",
    icon: <Cloud className="size-3" />,
  },
  {
    id: "alerts",
    label: "Emergency Alerts Support",
    icon: <Bell className="size-3" />,
  },
];
