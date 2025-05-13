"use client";
import { Button } from "@/app/_components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/_components/ui/dialog";
import { BotIcon, Loader2Icon } from "lucide-react";
import { generateAiReport } from "../_action/generate-ai-report";
import { useState } from "react";
import { ScrollArea } from "@/app/_components/ui/scroll-area";
import Markdown from "react-markdown";
import Link from "next/link";

interface AiReportButtonProps {
  month: string;
  hasPremiumPlan: boolean;
}

const AiReportButton = ({ month, hasPremiumPlan }: AiReportButtonProps) => {
  const [report, setReport] = useState<string | null>();
  const [reportIsLoading, setReportIsLoading] = useState(false);

  async function handleGenerateReportClick() {
    try {
      setReportIsLoading(true);
      const aiReport = await generateAiReport({ month });
      setReport(aiReport);
    } catch (error) {
      console.log(error);
    } finally {
      setReportIsLoading(false);
    }
  }

  return (
    <Dialog onOpenChange={(open) => !open && setReport(null)}>
      <DialogTrigger asChild>
        <Button variant={"ghost"}>
          Relatório IA
          <BotIcon />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[650px]">
        {hasPremiumPlan ? (
          <>
            <DialogHeader>
              <DialogTitle>Relatório IA</DialogTitle>
              <DialogDescription>
                Use inteligência artificial para gerar relatórios com insights
                sobre suas transações financeiras.
              </DialogDescription>
            </DialogHeader>
            <ScrollArea className="prose prose-h3:text-muted-foreground prose-h4:text-muted-foreground prose-strong:text-muted-foreground max-h-[450px] text-muted-foreground">
              <Markdown>{report}</Markdown>
            </ScrollArea>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant={"ghost"}>Cancelar</Button>
              </DialogClose>
              <Button
                onClick={handleGenerateReportClick}
                disabled={reportIsLoading}
              >
                {reportIsLoading && <Loader2Icon className="animate-spin" />}
                Gerar Relatório
              </Button>
            </DialogFooter>
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>Relatório IA</DialogTitle>
              <DialogDescription>
                você precisa de um plano premium para gerar relatórios com IA.
              </DialogDescription>
            </DialogHeader>

            <DialogFooter>
              <DialogClose asChild>
                <Button variant={"ghost"}>Cancelar</Button>
              </DialogClose>
              <Button asChild>
                <Link href={"/subscription"}>Assinar plano premium</Link>
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AiReportButton;
