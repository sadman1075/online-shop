interface StepperProps {
    step: number;
}

export default function Stepper({ step }: StepperProps) {
    const steps = ["Name", "Contact", "Birth", "Submit"];

    return (
        <div className=" md:flex items-center justify-between">     
         {steps.map((label, index) => {
            const stepNumber = index + 1;
            const isActive = step === stepNumber;
            const isCompleted = step > stepNumber;

            return (
                <div key={label} className="flex items-center w-full">

                    {/* STEP CIRCLE */}
                    <div
                        className={`w-8 h-8 rounded-full flex mt-2 md:mt-0 items-center justify-center text-white text-sm
              ${isCompleted || isActive ? "bg-pink-500" : "bg-gray-300"}`}
                    >
                        {isCompleted ? "✓" : stepNumber}
                    </div>

                    {/* LABEL */}
                    <span
                        className={`ml-2 text-sm mt-2 md:mt-0  ${isActive ? "text-pink-500" : "text-gray-500"
                            }`}
                    >
                        {label}
                    </span>

                    {/* LINE */}
                    {index !== steps.length - 1 && (
                        <div className="flex-1  bg-gray-300 mx-2"></div>
                    )}
                </div>
            );
        })}
        </div>
    );
}