"use client";

import useRentModal from "@/app/hooks/useRentModal";
import Modal from "./Modal";
import { useMemo, useState } from "react";
import { categories } from "../../data/categories";
import CategoryInput from "../inputs/CategoryInput";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import CitiesSelect from "../inputs/CitiesSelect";
import dynamic from "next/dynamic";
import Counter from "../inputs/Counter";
import ImageUpload from "../inputs/ImageUpload";
import Input from "../inputs/Input";
import axios from "axios";
import { useRouter } from "next/navigation";

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5,
}

const RentModal = () => {
  const router = useRouter();
  const rentModal = useRentModal();
  const [step, setStep] = useState(STEPS.CATEGORY);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      category: "",
      location: null,
      guestCount: 1,
      roomCount: 1,
      bathroomCount: 1,
      imageSrc: "",
      price: 1,
      title: "",
      description: "",
    },
  });

  const category = watch("category");
  const location = watch("location");
  const guestCount = watch("guestCount");
  const roomCount = watch("roomCount");
  const bathroomCount = watch("bathroomCount");
  const imageSrc = watch("imageSrc");

  const Map = useMemo(
    () =>
      dynamic(() => import("../map/Map"), {
        ssr: false,
      }),
    [location]
  );

  const onBack = () => {
    setStep((value) => value - 1);
  };

  const onNext = () => {
    if (stepIsValid()) {
      setStep((value) => value + 1);
    }
  };

  const stepIsValid = () => {
    switch (step) {
      case STEPS.CATEGORY:
        return category !== "";
      case STEPS.LOCATION:
        return location !== null;
      case STEPS.INFO:
        return (
          guestCount !== undefined &&
          roomCount !== undefined &&
          bathroomCount !== undefined
        );
      case STEPS.IMAGES:
        return imageSrc !== "";
      case STEPS.DESCRIPTION:
        return true;
      case STEPS.PRICE:
        return true;
      default:
        return false;
    }
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (step !== STEPS.PRICE) {
      return onNext();
    }

    setIsLoading(true);

    axios
      .post("/api/listings", data)
      .then(() => {
        console.log("success");
        router.refresh();
        reset();
        setStep(STEPS.CATEGORY);
        rentModal.onClose();
      })
      .catch(() => {
        alert("An error occured");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const actionLabel = useMemo(() => {
    if (step === STEPS.PRICE) {
      return "Create";
    }

    return "Next";
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.CATEGORY) {
      return undefined;
    }

    return "Back";
  }, [step]);

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  let bodyContent;

  switch (step) {
    case STEPS.LOCATION:
      bodyContent = (
        <div className="modal__body__content">
          <div className="modal__body__head">
            <h1>Where is your place located?</h1>
            <h4>Help guests find you!</h4>
          </div>
          <CitiesSelect
            value={location}
            onChange={(value) => setCustomValue("location", value)}
          />
          <Map center={location?.latlng} />
        </div>
      );
      break;

    case STEPS.INFO:
      bodyContent = (
        <div className="modal__body__content info">
          <div className="modal__body__head">
            <h1>Share some basics about your place</h1>
            <h4>What amenitis do you have?</h4>
          </div>
          <Counter
            onChange={(value) => setCustomValue("guestCount", value)}
            value={guestCount}
            title="Guests"
            subtitle="How many guests do you allow?"
          />
          <hr />
          <Counter
            onChange={(value) => setCustomValue("roomCount", value)}
            value={roomCount}
            title="Rooms"
            subtitle="How many rooms do you have?"
          />
          <hr />
          <Counter
            onChange={(value) => setCustomValue("bathroomCount", value)}
            value={bathroomCount}
            title="Bathrooms"
            subtitle="How many bathrooms do you have?"
          />
        </div>
      );
      break;

    case STEPS.IMAGES:
      bodyContent = (
        <div className="modal__body__content">
          <div className="modal__body__head">
            <h1>Add a photo of your place</h1>
            <h4>Show guests what your place looks like!</h4>
          </div>
          <ImageUpload
            onChange={(value) => setCustomValue("imageSrc", value)}
            value={imageSrc}
          />
        </div>
      );
      break;

    case STEPS.DESCRIPTION:
      bodyContent = (
        <div className="modal__body__content">
          <div className="modal__body__head">
            <h1>How would you describe your place?</h1>
            <h4>Short and sweet works best!</h4>
            <Input
              id="title"
              label="Title"
              disabled={isLoading}
              register={register}
              errors={errors}
              required
            />
            <hr />
            <Input
              id="description"
              label="Description"
              disabled={isLoading}
              register={register}
              errors={errors}
              required
            />
          </div>
        </div>
      );
      break;

    case STEPS.PRICE:
      bodyContent = (
        <div className="modal__body__content">
          <div className="modal__body__head">
            <h1>Now, set your price</h1>
            <h4>How much do you charge per night?</h4>
          </div>
          <Input
            id="price"
            label="Price"
            formatPrice
            type="number"
            disabled={isLoading}
            register={register}
            errors={errors}
            required
          />
        </div>
      );
      break;

    default:
      bodyContent = (
        <div className="modal__body__content">
          <div className="modal__body__head">
            <h1>Which of these best describes your place?</h1>
            <h4>Pick a category</h4>
          </div>
          <div className="categories__list">
            {categories.map((item, index: any) => {
              
              return (
                <CategoryInput
                  key={index}
                  onClick={(category) => setCustomValue("category", category)}
                  selected={category === item.label}
                  label={item.label}
                  icon={item.icon}
                />
              );
            })}
          </div>
        </div>
      );
      break;
  }

  return (
    <Modal
      disabled={isLoading}
      isOpen={rentModal.isOpen}
      onClose={rentModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      title="Hestia your home!"
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
      body={bodyContent}
    />
  );
};

export default RentModal;
