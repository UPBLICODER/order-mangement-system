import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Card, Button } from "../../ui";
import { useOrders } from "../../../context/OrderContext";
import { cn } from "../../../utils/cn";

const steps = [
  { label: "User Info" },
  { label: "Order Details" },
  { label: "Review" },
];

const ErrorText = ({ message }) =>
  message ? <p className="text-xs text-red-400 mt-1">{message}</p> : null;

export default function OrderForm({ defaultValues, isEdit }) {
  const navigate = useNavigate();
  const { addOrder, updateOrder, deleteOrder } = useOrders();
  const [step, setStep] = useState(0);

  const {
    register,
    handleSubmit,
    trigger,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: defaultValues || {
      customerName: "",
      email: "",
      phone: "",
      city: "",
      status: "pending",
      priority: "medium",
      amount: "",
      assignedTo: "",
    },
  });

  useEffect(() => {
    if (defaultValues) reset(defaultValues);
  }, [defaultValues, reset]);

  const data = watch();

  const handleNext = async () => {
    const fields =
      step === 0
        ? ["customerName", "email", "phone", "city"]
        : ["status", "priority", "amount"];

    const isValid = await trigger(fields);
    if (isValid) setStep((s) => s + 1);
  };

  const handlePrev = () => setStep((s) => s - 1);

  const onSubmit = (formData) => {
    const payload = {
      ...formData,
      amount: Number(formData.amount),
      updatedAt: new Date().toISOString(),
    };

    if (isEdit) {
      updateOrder(defaultValues.id, payload);
    } else {
      addOrder({
        ...payload,
        id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
        createdAt: new Date().toISOString(),
        items: [],
        notes: [],
      });
    }

    navigate("/orders");
  };

  const handleDelete = () => {
    deleteOrder(defaultValues.id);
    navigate("/orders");
  };

  const inputClass = (field) =>
    cn(
      "w-full bg-[#0b0f1a] text-white border rounded-xl px-3 py-2 text-sm transition outline-none",
      errors[field]
        ? "border-red-500 focus:ring-2 focus:ring-red-500/40"
        : "border-white/10 focus:ring-2 focus:ring-indigo-500/40",
    );

  return (
    <Card className="max-w-3xl mx-auto space-y-6">
      {/* STEP INDICATOR */}
      <div className="relative">
        <div className="grid grid-cols-3 relative h-8">
          <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-white/10 -translate-y-1/2" />
          <div
            className="absolute top-1/2 left-0 h-[2px] bg-indigo-500 transition-all duration-500 -translate-y-1/2"
            style={{ width: `${(step / 2) * 100}%` }}
          />

          {steps.map((_, i) => (
            <div key={i} className="flex justify-center items-center z-10">
              <div
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-xs",
                  i <= step
                    ? "bg-indigo-500 text-white"
                    : "bg-[#1a1f2e] text-gray-500 border border-white/10",
                )}
              >
                {i < step ? "✓" : i + 1}
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-3 mt-2">
          {steps.map((s, i) => (
            <p
              key={i}
              className={cn(
                "text-center text-xs",
                i <= step ? "text-white" : "text-white/40",
              )}
            >
              {s.label}
            </p>
          ))}
        </div>
      </div>

      {/* FORM */}
      <form
        onSubmit={(e) => e.preventDefault()}
        onKeyDown={(e) => e.key === "Enter" && e.preventDefault()}
        className="space-y-5"
      >
        {/* STEP 1 */}
        {step === 0 && (
          <div className="space-y-3">
            <input
              placeholder="Customer Name"
              className={inputClass("customerName")}
              {...register("customerName", {
                required: "Name is required",
              })}
            />
            <ErrorText message={errors.customerName?.message} />

            <input
              placeholder="Email"
              className={inputClass("email")}
              {...register("email", {
                required: "Email required",
                pattern: {
                  value: /^\S+@\S+$/,
                  message: "Invalid email",
                },
              })}
            />
            <ErrorText message={errors.email?.message} />

            <input
              placeholder="Phone"
              className={inputClass("phone")}
              {...register("phone", {
                required: "Phone required",
                pattern: {
                  value: /^[6-9]\d{9}$/,
                  message: "Enter valid Indian mobile number",
                },
              })}
            />
            <ErrorText message={errors.phone?.message} />

            <input
              placeholder="City"
              className={inputClass("city")}
              {...register("city", {
                required: "City required",
              })}
            />
            <ErrorText message={errors.city?.message} />
          </div>
        )}

        {/* STEP 2 */}
        {step === 1 && (
          <div className="space-y-3">
            <select className={inputClass("status")} {...register("status")}>
              <option className="bg-[#0b0f1a]" value="pending">
                Pending
              </option>
              <option className="bg-[#0b0f1a]" value="in_progress">
                In Progress
              </option>
              <option className="bg-[#0b0f1a]" value="completed">
                Completed
              </option>
              <option className="bg-[#0b0f1a]" value="cancelled">
                Cancelled
              </option>
            </select>

            <select
              className={inputClass("priority")}
              {...register("priority")}
            >
              <option className="bg-[#0b0f1a]" value="low">
                Low
              </option>
              <option className="bg-[#0b0f1a]" value="medium">
                Medium
              </option>
              <option className="bg-[#0b0f1a]" value="high">
                High
              </option>
            </select>

            <input
              type="number"
              placeholder="Amount"
              className={inputClass("amount")}
              {...register("amount", {
                required: "Amount required",
                min: {
                  value: 1,
                  message: "Amount must be greater than 0",
                },
              })}
            />
            <ErrorText message={errors.amount?.message} />

            <input
              placeholder="Assigned To"
              className={inputClass("assignedTo")}
              {...register("assignedTo")}
            />
          </div>
        )}

        {/* STEP 3 */}
        {step === 2 && (
          <div className="bg-white/[0.03] border border-white/5 p-8 rounded-2xl">
            <div className="space-y-6">
              {/* Use a grid with 2 columns. Left is auto-width, right takes remaining space. */}

              <div className="grid grid-cols-2 items-center">
                <span className="text-gray-400 text-sm">Name</span>
                <span className="text-white text-sm text-right font-medium">
                  {data.customerName}
                </span>
              </div>

              <div className="grid grid-cols-2 items-center">
                <span className="text-gray-400 text-sm">Email</span>
                <span className="text-white text-sm text-right truncate ml-4 font-medium">
                  {data.email}
                </span>
              </div>

              <div className="grid grid-cols-2 items-center">
                <span className="text-gray-400 text-sm">Status</span>
                <div className="flex justify-end">
                  <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                    {data.status?.replace("_", " ")}
                  </span>
                </div>
              </div>

              {/* Subtle divider to separate the price */}
              <div className="h-px bg-white/5 w-full my-2" />

              <div className="grid grid-cols-2 items-center">
                <span className="text-gray-400 text-sm font-medium">
                  Amount
                </span>
                <span className="text-xl font-bold text-indigo-400 text-right">
                  ₹{Number(data.amount).toLocaleString("en-IN")}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* ACTIONS */}
        <div className="flex justify-between">
          <div className="flex gap-2">
            {step > 0 && (
              <Button type="button" variant="ghost" onClick={handlePrev}>
                Back
              </Button>
            )}

            {isEdit && (
              <Button
                type="button"
                variant="ghost"
                className="text-red-500 hover:bg-red-500/10"
                onClick={handleDelete}
              >
                Delete
              </Button>
            )}
          </div>

          {step < 2 ? (
            <Button type="button" onClick={handleNext}>
              Next
            </Button>
          ) : (
            <Button type="button" onClick={handleSubmit(onSubmit)}>
              {isEdit ? "Update Order" : "Create Order"}
            </Button>
          )}
        </div>
      </form>
    </Card>
  );
}
