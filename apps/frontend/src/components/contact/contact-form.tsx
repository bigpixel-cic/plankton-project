'use client';

import { useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { TextInput, CheckboxInput } from '@/components/contact/inputs';
import { contactFormSchema } from '@/components/contact/schema';
import { toast } from 'sonner';
import clsx from 'clsx';
import { LoaderCircle, CircleCheck } from 'lucide-react';

import type { ContactFormData } from '@/components/contact/schema';

const defaultValues: ContactFormData = {
  firstName: '',
  lastName: '',
  email: '',
  postcode: '',
  newsletter: false,
  join: false,
};

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues,
  });

  const onSubmit: SubmitHandler<ContactFormData> = async (data) => {
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('An error occurred while submitting the form. Please try again later.');
    } finally {
      toast.success('Form submitted successfully!');
    }
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset(defaultValues, { keepIsSubmitted: true });
    }
  }, [isSubmitSuccessful, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-8">
      <div className="w-full flex flex-col md:flex-row gap-6">
        <TextInput
          label="First Name"
          {...register('firstName')}
          error={errors.firstName?.message}
          placeholder="Victor"
        />
        <TextInput
          label="Last Name"
          {...register('lastName')}
          error={errors.lastName?.message}
          placeholder="Hensen"
        />
      </div>
      <TextInput
        label="Email"
        {...register('email')}
        error={errors.email?.message}
        placeholder="victor.hensen@uni-kiel.de"
      />
      <div className="w-full flex md:flex-row flex-col-reverse gap-6">
        <fieldset className="flex flex-col justify-between">
          <CheckboxInput label="Subscribe to newsletter" {...register('newsletter')} />
          <CheckboxInput label="I would like to get involved" {...register('join')} />
        </fieldset>
        <div className="flex-1">
          <TextInput
            label="Postcode"
            {...register('postcode')}
            error={errors.postcode?.message}
            placeholder="24118"
          />
        </div>
      </div>
      <div>
        <button
          type="submit"
          disabled={isSubmitting}
          className={clsx(
            'w-20 px-3.5 py-2.5 flex items-center justify-center text-white rounded-lg disabled:bg-white/30 transition-colors ease-out duration-200',
            isSubmitting && 'bg-white/30 cursor-not-allowed',
            isSubmitSuccessful ? 'bg-green-500 hover:bg-green-600' : 'bg-blue-500 hover:bg-blue-600'
          )}
        >
          {isSubmitting ? (
            <LoaderCircle size={16} className="animate-spin" />
          ) : isSubmitSuccessful ? (
            <CircleCheck size={16} />
          ) : (
            'Submit'
          )}
        </button>
      </div>
    </form>
  );
}
