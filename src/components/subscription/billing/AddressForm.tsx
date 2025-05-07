"use client";

import { useState } from "react";
import { MapPinIcon as MapPinHouse } from "lucide-react";

import Button from "@/components/ui/button";
import Modal from "@/components/ui/Modal";
import { Address } from "./Billing";
import { Toast } from "@/components/ui/toast";

interface AddressFormModalProps {
  onClose: () => void;
  initialAddress?: Address;
  onSave?: (address: Address) => void;
}

interface FormErrors {
  [key: string]: string;
}

export function AddressForm({
  onClose,
  initialAddress,
  onSave,
}: AddressFormModalProps) {
  const [address, setAddress] = useState<Address>(
    initialAddress || {
      name: "",
      line1: "",
      line2: "",
      city: "",
      state: "",
      postalCode: "",
      country: "",
    }
  );

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAddress((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error for this field when user types
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!address.name.trim()) {
      newErrors.name = "Full name is required";
    }

    if (!address.line1.trim()) {
      newErrors.line1 = "Address line 1 is required";
    }

    if (!address.city.trim()) {
      newErrors.city = "City is required";
    }

    if (!address.state.trim()) {
      newErrors.state = "State/Province is required";
    }

    if (!address.postalCode.trim()) {
      newErrors.postalCode = "Postal code is required";
    } else if (
      !/^\d{5}(-\d{4})?$/.test(address.postalCode) &&
      address.country === "United States"
    ) {
      newErrors.postalCode = "Invalid US postal code format";
    }

    if (!address.country.trim()) {
      newErrors.country = "Country is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (validateForm()) {
      if (onSave) {
        try {
          onSave(address);
          Toast.success("Address updated successfully");
          onClose();
        } catch (error) {
          Toast.error("Failed to save address. Please try again.");
          console.log(error);
        }
      } else {
        Toast.success("Address updated successfully");
        onClose();
      }
    } else {
      Toast.error("Please fix the errors in the form");
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    onClose();
    Toast.error("Your Address has been not Updated");
  };

  return (
    <Modal>
      <div className='p-6'>
        <div className='flex items-center'>
          <MapPinHouse className='w-5 h-5 text-text mr-2' />
          <h3 className='text-lg font-semibold text-text'>
            Update Billing Address
          </h3>
        </div>
        <p className='text-sm text-foreground mt-1'>
          Make changes to your billing address here. Click save when you're
          done.
        </p>
      </div>
      <div className='p-6 pt-0'>
        <form onSubmit={handleSubmit} noValidate>
          <div className='grid gap-4 py-4'>
            <div className='grid gap-2'>
              <label htmlFor='name' className='text-sm font-medium'>
                Full Name
              </label>
              <input
                id='name'
                name='name'
                value={address.name}
                onChange={handleChange}
                placeholder='John Doe'
                required
                className={`input p-2 border rounded-md ${
                  errors.name ? "border-red-500" : "border-border"
                }`}
              />
              {errors.name && (
                <p className='text-red-500 text-xs mt-1'>{errors.name}</p>
              )}
            </div>

            <div className='grid gap-2'>
              <label htmlFor='line1' className='text-sm font-medium'>
                Address Line 1
              </label>
              <input
                id='line1'
                name='line1'
                value={address.line1}
                onChange={handleChange}
                placeholder='123 Main St'
                required
                className={`input p-2 border rounded-md ${
                  errors.line1 ? "border-red-500" : "border-border"
                }`}
              />
              {errors.line1 && (
                <p className='text-red-500 text-xs mt-1'>{errors.line1}</p>
              )}
            </div>

            <div className='grid gap-2'>
              <label htmlFor='line2' className='text-sm font-medium'>
                Address Line 2 (Optional)
              </label>
              <input
                id='line2'
                name='line2'
                value={address.line2 || ""}
                onChange={handleChange}
                placeholder='Apt 4B, Floor 2, etc.'
                className='input p-2 border rounded-md border-border'
              />
            </div>

            <div className='grid grid-cols-2 gap-4'>
              <div className='grid gap-2'>
                <label htmlFor='city' className='text-sm font-medium'>
                  City
                </label>
                <input
                  id='city'
                  name='city'
                  value={address.city}
                  onChange={handleChange}
                  placeholder='New York'
                  required
                  className={`input p-2 border rounded-md ${
                    errors.city ? "border-red-500" : "border-border"
                  }`}
                />
                {errors.city && (
                  <p className='text-red-500 text-xs mt-1'>{errors.city}</p>
                )}
              </div>

              <div className='grid gap-2'>
                <label htmlFor='state' className='text-sm font-medium'>
                  State/Province
                </label>
                <input
                  id='state'
                  name='state'
                  value={address.state}
                  onChange={handleChange}
                  placeholder='NY'
                  required
                  className={`input p-2 border rounded-md ${
                    errors.state ? "border-red-500" : "border-border"
                  }`}
                />
                {errors.state && (
                  <p className='text-red-500 text-xs mt-1'>{errors.state}</p>
                )}
              </div>
            </div>

            <div className='grid grid-cols-2 gap-4'>
              <div className='grid gap-2'>
                <label htmlFor='postalCode' className='text-sm font-medium'>
                  Postal Code
                </label>
                <input
                  id='postalCode'
                  name='postalCode'
                  value={address.postalCode}
                  onChange={handleChange}
                  placeholder='10001'
                  required
                  className={`input p-2 border rounded-md ${
                    errors.postalCode ? "border-red-500" : "border-border"
                  }`}
                />
                {errors.postalCode && (
                  <p className='text-red-500 text-xs mt-1'>
                    {errors.postalCode}
                  </p>
                )}
              </div>

              <div className='grid gap-2'>
                <label htmlFor='country' className='text-sm font-medium'>
                  Country
                </label>
                <input
                  id='country'
                  name='country'
                  value={address.country}
                  onChange={handleChange}
                  placeholder='United States'
                  required
                  className={`input p-2 border rounded-md ${
                    errors.country ? "border-red-500" : "border-border"
                  }`}
                />
                {errors.country && (
                  <p className='text-red-500 text-xs mt-1'>{errors.country}</p>
                )}
              </div>
            </div>
          </div>

          <div className='flex justify-end space-x-3 mt-6'>
            <Button
              type='button'
              onClick={handleCancel}
              className='hover:bg-hover border border-border'
            >
              Cancel
            </Button>
            <Button
              type='submit'
              disabled={isSubmitting}
              className='hover:bg-hover bg-card text-text border border-border'
            >
              {isSubmitting ? "Saving..." : "Save Address"}
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
