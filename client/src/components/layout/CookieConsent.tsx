import { Button } from "@/components/ui/button";
import { Shield } from "lucide-react";

interface CookieConsentProps {
  onAccept: () => void;
  onDecline: () => void;
}

export default function CookieConsent({ onAccept, onDecline }: CookieConsentProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-dark shadow-lg border-t border-teal-700/30 p-4 z-50">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center mb-4 md:mb-0 md:mr-8">
          <Shield className="text-primary mr-3 h-5 w-5" />
          <p className="text-light text-sm font-technical">
            This site uses cookies for essential functionality and to analyze site traffic.
            <a href="#privacy" className="text-primary hover:underline ml-1 font-medium">Privacy Policy</a>
          </p>
        </div>
        <div className="flex space-x-3">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onDecline}
            className="border-primary/30 hover:border-primary/60 text-light font-medium"
          >
            Decline
          </Button>
          <Button 
            variant="default" 
            size="sm" 
            onClick={onAccept}
            className="bg-primary hover:bg-primary/90 text-white font-medium"
          >
            Accept
          </Button>
        </div>
      </div>
    </div>
  );
}
