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
    clearErrors,
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

  // IMPORTANT FIX: reload edit data correctly
  useEffect(() => {
    if (defaultValues) {
      reset(defaultValues);
    }
  }, [defaultValues, reset]);

  const data = watch();

  // STEP VALIDATION
  const next = async () => {
    const fields =
      step === 0
        ? ["customerName", "email", "phone", "city"]
        : ["status", "priority", "amount"];

    const valid = await trigger(fields);
    if (valid) setStep((s) => s + 1);
  };

  const prev = () => setStep((s) => s - 1);

  // SUBMIT
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

  // DELETE
  const handleDelete = () => {
    deleteOrder(defaultValues.id);
    navigate("/orders");
  };

  const inputClass = (field) =>
    cn(
      "w-full bg-white/5 border rounded-xl px-3 py-2 text-sm transition outline-none",
      errors[field]
        ? "border-red-500 focus:ring-2 focus:ring-red-500/40"
        : "border-white/10 focus:ring-2 focus:ring-indigo-500/40",
    );

  return (
    <Card className="max-w-3xl mx-auto space-y-6">
      {/* TIMELINE (MATCH DETAIL PAGE STYLE) */}
      <div className="relative">
        {/* CIRCLES ROW (REFERENCE FOR LINE) */}
        <div className="grid grid-cols-3 relative h-8">
          {/* BASE LINE */}
          <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-white/10 -translate-y-1/2" />

          {/* ACTIVE LINE */}
          <div
            className="absolute top-1/2 left-0 h-[2px] bg-indigo-500 transition-all duration-500 -translate-y-1/2"
            style={{ width: `${(step / 2) * 100}%` }}
          />

          {/* CIRCLES */}
          {steps.map((s, i) => {
            const active = i <= step;

            return (
              <div key={i} className="flex justify-center items-center z-10">
                <div
                  className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center text-xs",
                    active
                      ? "bg-indigo-500 text-white"
                      : "bg-[#1a1f2e] text-gray-500 border border-white/10",
                  )}
                >
                  {active ? "✓" : i + 1}
                </div>
              </div>
            );
          })}
        </div>

        {/* LABELS ROW */}
        <div className="grid grid-cols-3 mt-2">
          {steps.map((s, i) => {
            const active = i <= step;

            return (
              <p
                key={i}
                className={`text-center text-xs ${
                  active ? "text-white" : "text-gray-500"
                }`}
              >
                {s.label}
              </p>
            );
          })}
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* STEP 1 */}
        {step === 0 && (
          <div className="space-y-3">
            <input
              placeholder="Customer Name"
              className={inputClass("customerName")}
              {...register("customerName", {
                required: "Name is required",
                onChange: () => clearErrors("customerName"),
              })}
            />
            {errors.customerName && (
              <p className="text-xs text-red-400">
                {errors.customerName.message}
              </p>
            )}

            <input
              placeholder="Email"
              className={inputClass("email")}
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email",
                },
                onChange: () => clearErrors("email"),
              })}
            />
            {errors.email && (
              <p className="text-xs text-red-400">{errors.email.message}</p>
            )}

            <input
              placeholder="Phone"
              className={inputClass("phone")}
              {...register("phone", {
                required: "Phone required",
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: "Enter valid 10 digit number",
                },
                onChange: () => clearErrors("phone"),
              })}
            />
            {errors.phone && (
              <p className="text-xs text-red-400">{errors.phone.message}</p>
            )}

            <input
              placeholder="City"
              className={inputClass("city")}
              {...register("city", {
                required: "City required",
                onChange: () => clearErrors("city"),
              })}
            />
            {errors.city && (
              <p className="text-xs text-red-400">{errors.city.message}</p>
            )}
          </div>
        )}

        {/* STEP 2 */}
        {step === 1 && (
          <div className="space-y-3">
            <select className={inputClass("status")} {...register("status")}>
              <option value="pending">Pending</option>
              <option value="in_progress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>

            <select
              className={inputClass("priority")}
              {...register("priority")}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>

            <input
              type="number"
              className={inputClass("amount")}
              {...register("amount", {
                required: "Amount required",
                min: { value: 1, message: "Must be greater than 0" },
                onChange: () => clearErrors("amount"),
              })}
            />
            {errors.amount && (
              <p className="text-xs text-red-400">{errors.amount.message}</p>
            )}

            <input
              placeholder="Assigned To"
              className={inputClass("assignedTo")}
              {...register("assignedTo")}
            />
          </div>
        )}

        {/* STEP 3 */}
        {step === 2 && (
          <div className="bg-white/5 p-4 rounded-xl text-sm space-y-2">
            <p>
              <b>Name:</b> {data.customerName}
            </p>
            <p>
              <b>Email:</b> {data.email}
            </p>
            <p>
              <b>Status:</b> {data.status}
            </p>
            <p>
              <b>Amount:</b> ₹{data.amount}
            </p>
          </div>
        )}

        {/* ACTIONS */}
        <div className="flex justify-between">
          <div className="flex gap-2">
            {step > 0 && (
              <Button type="button" variant="ghost" onClick={prev}>
                Back
              </Button>
            )}

            {isEdit && (
              <Button
                type="button"
                variant="ghost"
                className="text-red-400"
                onClick={handleDelete}
              >
                Delete
              </Button>
            )}
          </div>

          {step < 2 ? (
            <Button type="button" onClick={next}>
              Next
            </Button>
          ) : (
            <Button type="submit">
              {isEdit ? "Update Order" : "Create Order"}
            </Button>
          )}
        </div>
      </form>
    </Card>
  );
}
