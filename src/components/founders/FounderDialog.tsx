
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Founder } from "./foundersData";

interface FounderDialogProps {
  founder: Founder;
}

const FounderDialog: React.FC<FounderDialogProps> = ({ founder }) => {
  const hasMultilineContent = ["Magnus Jones", "Ruben Junger", "Michal A. Gromek"].includes(founder.name);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="text-[#cb46b3] hover:text-[#881ec9] mt-auto pt-2 mx-auto inline-flex items-center text-[clamp(0.8rem,0.75rem+0.2vw,1rem)] font-medium relative z-20">
          Read more
        </button>
      </DialogTrigger>
      <DialogContent className="bg-gradient-to-br from-[#000624] to-[#282c2f] border-none max-w-lg text-white">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-white">
            {founder.name}
          </DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          <p className={`text-white/80 ${hasMultilineContent ? "whitespace-pre-line" : ""}`}>
            {founder.fullBio}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FounderDialog;
