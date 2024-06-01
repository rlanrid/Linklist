'use client';

import { faImage, faSave } from "@fortawesome/free-regular-svg-icons";
import RadioTogglers from "../formItems/radioTogglers";
import { faPalette } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import SubmitButton from "../buttons/SubmitButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import savePageSettings from "@/actions/pageActions";
import toast from "react-hot-toast";
import { useState } from "react";

export default function PageSetingsForm({ page, user }) {
  const [bgType, setBgType] = useState(page.bgType);
  const [bgColor, setBgColor] = useState(page.bgColor);
  async function saveBaseSettings(formData) {
    console.log(formData.get('displayName'));

    const result = await savePageSettings(formData);
    if (result) {
      toast.success('Saved!');
    }
  }

  function handleFileChange(ev) {
    const file = ev.target.files?.[0];
    if (file) {
      const data = new FormData;
      data.set('file', file);
      fetch('/api/upload', {
        method: 'POST',
        body: data,
      }).then(response => {
        response.json().then(link => {
          console.log(link);
        });
      });
    }
  }

  return (
    <div className="-m-4">
      <form action={saveBaseSettings}>
        <div
          className="bg-gray-300 py-16 flex justify-center items-center"
          style={{ backgroundColor: bgColor }}
        >
          <div>
            <RadioTogglers
              defaultValue={page.bgType}
              options={[
                { value: 'color', icon: faPalette, label: 'Color' },
                { value: 'image', icon: faImage, label: 'Image' },
              ]}
              onChange={val => setBgType(val)}
            />

            {bgType === 'color' && (
              <div className='bg-gray-200 shadow text-gray-700 p-2 mt-2'>
                <div className="flex gap-2 justify-center">
                  <span>Background color:</span>
                  <input
                    type="color"
                    name="bgColor"
                    onChange={ev => setBgColor(ev.target.value)}
                    defaultValue={page.bgColor}
                  />
                </div>
              </div>
            )}
            {bgType === 'image' && (
              <div className="flex justify-center">
                <label
                  className="bg-white shadow px-4 py-2 mt-2"
                >
                  <input
                    type="file"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  Change Image
                </label>
              </div>
            )}
          </div>
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