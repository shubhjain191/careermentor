"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { BookOpen, Briefcase, Code, User, Loader2, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import useFetch from "@/hooks/use-fetch";
import { onboardingSchema } from "@/app/lib/schema";
import { updateUser } from "@/actions/user";

const OnboardingForm = ({ industries }) => {
  const router = useRouter();
  const [selectedIndustry, setSelectedIndustry] = useState(null);
  const [step, setStep] = useState(1);
  const totalSteps = 3;
  const progress = (step / totalSteps) * 100;

  const {
    loading: updateLoading,
    fn: updateUserFn,
    data: updateResult,
  } = useFetch(updateUser);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
    watch,
    trigger,
  } = useForm({
    resolver: zodResolver(onboardingSchema),
    mode: "onChange",
  });

  const onSubmit = async (values) => {
    try {
      const formattedIndustry = `${values.industry}-${values.subIndustry
        .toLowerCase()
        .replace(/ /g, "-")}`;

      await updateUserFn({
        ...values,
        industry: formattedIndustry,
      });
    } catch (error) {
      console.error("Onboarding error:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  useEffect(() => {
    if (updateResult?.success && !updateLoading) {
      toast.success("Profile completed successfully!");
      router.push("/dashboard");
      router.refresh();
    }
  }, [updateResult, updateLoading, router]);

  const watchIndustry = watch("industry");
  const watchSubIndustry = watch("subIndustry");
  const watchExperience = watch("experience");
  const watchSkills = watch("skills");
  const watchBio = watch("bio");

  const nextStep = async () => {
    let fieldsToValidate = [];
    
    if (step === 1) {
      fieldsToValidate = ["industry", "subIndustry"];
    } else if (step === 2) {
      fieldsToValidate = ["experience", "skills"];
    }
    
    const isStepValid = await trigger(fieldsToValidate);
    
    if (isStepValid) {
      setStep(prev => Math.min(prev + 1, totalSteps));
    }
  };

  const prevStep = () => {
    setStep(prev => Math.max(prev - 1, 1));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-background to-secondary/10 p-4">
      <Card className="w-full max-w-lg shadow-lg">
        <CardHeader className="pb-4">
          <div className="flex justify-between items-center mb-2">
            <CardTitle className="gradient-title text-3xl font-bold">
              {step === 1 && "Choose Your Path"}
              {step === 2 && "Your Experience"}
              {step === 3 && "Tell Your Story"}
            </CardTitle>
            <span className="text-sm font-medium text-muted-foreground">
              Step {step} of {totalSteps}
            </span>
          </div>
          <Progress value={progress} className="h-2 mb-2" />
          <CardDescription className="text-base">
            {step === 1 && "Select your industry to get personalized career insights."}
            {step === 2 && "Share your professional background and technical skills."}
            {step === 3 && "Help us understand your experience and aspirations."}
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <form id="onboardingForm" onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {step === 1 && (
              <>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Briefcase className="h-5 w-5 text-primary" />
                    <Label htmlFor="industry" className="text-lg font-medium">Industry</Label>
                  </div>
                  <Select
                    onValueChange={(value) => {
                      setValue("industry", value);
                      setSelectedIndustry(
                        industries.find((ind) => ind.id === value)
                      );
                      setValue("subIndustry", "");
                    }}
                  >
                    <SelectTrigger id="industry" className="h-12 text-base">
                      <SelectValue placeholder="Select an industry" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Industries</SelectLabel>
                        {industries.map((ind) => (
                          <SelectItem key={ind.id} value={ind.id}>
                            {ind.name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  {errors.industry && (
                    <p className="text-sm text-destructive font-medium">
                      {errors.industry.message}
                    </p>
                  )}
                </div>

                {watchIndustry && (
                  <div className="space-y-3 animate-in fade-in-50 duration-300">
                    <div className="flex items-center gap-2">
                      <Code className="h-5 w-5 text-primary" />
                      <Label htmlFor="subIndustry" className="text-lg font-medium">Specialization</Label>
                    </div>
                    <Select
                      onValueChange={(value) => setValue("subIndustry", value)}
                    >
                      <SelectTrigger id="subIndustry" className="h-12 text-base">
                        <SelectValue placeholder="Select your specialization" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Specializations</SelectLabel>
                          {selectedIndustry?.subIndustries.map((sub) => (
                            <SelectItem key={sub} value={sub}>
                              {sub}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    {errors.subIndustry && (
                      <p className="text-sm text-destructive font-medium">
                        {errors.subIndustry.message}
                      </p>
                    )}
                  </div>
                )}
              </>
            )}

            {step === 2 && (
              <>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-primary" />
                    <Label htmlFor="experience" className="text-lg font-medium">Years of Experience</Label>
                  </div>
                  <Input
                    id="experience"
                    type="number"
                    min="0"
                    max="50"
                    placeholder="Enter years of experience"
                    className="h-12 text-base"
                    {...register("experience")}
                  />
                  {errors.experience && (
                    <p className="text-sm text-destructive font-medium">
                      {errors.experience.message}
                    </p>
                  )}
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Code className="h-5 w-5 text-primary" />
                    <Label htmlFor="skills" className="text-lg font-medium">Skills</Label>
                  </div>
                  <Input
                    id="skills"
                    placeholder="e.g., Python, JavaScript, Project Management"
                    className="h-12 text-base"
                    {...register("skills")}
                  />
                  <p className="text-sm text-muted-foreground">
                    Separate multiple skills with commas
                  </p>
                  {errors.skills && (
                    <p className="text-sm text-destructive font-medium">{errors.skills.message}</p>
                  )}
                </div>
              </>
            )}

            {step === 3 && (
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <User className="h-5 w-5 text-primary" />
                  <Label htmlFor="bio" className="text-lg font-medium">Professional Bio</Label>
                </div>
                <Textarea
                  id="bio"
                  placeholder="Tell us about your professional background, achievements, and career goals..."
                  className="h-40 text-base"
                  {...register("bio")}
                />
                <p className="text-sm text-muted-foreground">
                  Your bio helps us tailor opportunities to your specific experience
                </p>
                {errors.bio && (
                  <p className="text-sm text-destructive font-medium">{errors.bio.message}</p>
                )}
              </div>
            )}
          </form>
        </CardContent>

        <CardFooter className="flex justify-between gap-2">
          {step > 1 ? (
            <Button 
              type="button" 
              variant="outline" 
              onClick={prevStep}
              className="w-1/3"
            >
              Back
            </Button>
          ) : (
            <div className="w-1/3"></div>
          )}
          
          {step < totalSteps ? (
            <Button 
              type="button" 
              onClick={nextStep} 
              className="w-2/3"
              disabled={
                (step === 1 && (!watchIndustry || !watchSubIndustry)) ||
                (step === 2 && (!watchExperience || !watchSkills))
              }
            >
              Continue <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button 
              type="submit"
              form="onboardingForm"
              className="w-2/3"
              disabled={updateLoading || !watchBio}
            >
              {updateLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Complete Profile"
              )}
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default OnboardingForm;