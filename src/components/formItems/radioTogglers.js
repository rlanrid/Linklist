import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function RadioTogglers({ options, defaultValue }) {
  return (
    <div className="radio-togglers">
      {options.map(option => (
        <label>
          <input
            type='radio'
            name='bgType'
            defaultChecked={defaultValue === option.value}
            value={option.value}
          />
          <div>
            <FontAwesomeIcon icon={option.icon} />
            <span>{option.label}</span>
          </div>
        </label>
      ))}
    </div>
  );
}