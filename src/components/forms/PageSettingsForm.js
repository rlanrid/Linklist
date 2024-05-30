'use client';

import { faImage, faSave } from "@fortawesome/free-regular-svg-icons";
import RadioTogglers from "../formItems/radioTogglers";
import { faPalette } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import SubmitButton from "../buttons/SubmitButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import savePageSettings from "@/actions/pageActions";
import toast from "react-hot-toast";

export default function PageSetingsForm({ page, user }) {
  async function saveBaseSettings(formData) {
    console.log(formData.get('displayName'));

    const result = await savePageSettings(formData);
    if (result) {
      toast.success('Saved!');
    }
  }
  return (
    <div className="-m-4">
      <form action={saveBaseSettings}>
        <div className="bg-gray-300 py-16 flex justify-center items-center">
          <RadioTogglers
            defaultValue={'color'}
            options={[
              { value: 'color', icon: faPalette, label: 'Color' },
              { value: 'image', icon: faImage, label: 'Image' },
            ]}
          />
        </div>
        <div className="flex justify-center -mb-12">
          <Image
            className="rounded-full relative -top-8 border-4 border-white shadow 
            shadow-black/50"
            src={user?.image}
            alt={'avatar'}
            width={128}
            height={128}
          />
        </div>
        <div className="p-4">
          <label className="input-label" htmlFor="nameIn">Display name</label>
          <input
            type="text"
            id="nameIn"
            name="displayName"
            defaultValue={page.displayName}
            placeholder="John Doe"
          />
          <label className="input-label" htmlFor="locationIn">Location</label>
          <input
            type="text"
            id="locationIn"
            name="location"
            defaultValue={page.location}
            placeholder="Somewhere in the world"
          />
          <label className="input-label" htmlFor="bioIn">Bio</label>
          <textarea
            name="bio"
            defaultValue={page.bio}
            id="bioIn"
            placeholder="Your bio goes here..."
          />
          <div className="max-w-[200px] mx-auto">
            <SubmitButton>
              <FontAwesomeIcon icon={faSave} />
              <span>Save</span>
            </SubmitButton>
          </div>
        </div>
      </form>
    </div>
  );
}