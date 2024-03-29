import { NavLink } from "react-router-dom";
import classNames from "classnames";

import { readFromLocalStorage } from "../../Helpers";
import { Button } from "../../Types";
import "./Certificates.scss"

type Props = {
  isAdd: boolean
  setIsAdd: (v: boolean) => void;
}

export const Certificates: React.FC<Props> = ({ setIsAdd, isAdd }) => {
  const retrievedData = readFromLocalStorage('certificates');

  return (
    <div className="certificates">
      <button
        type="button"
        className="certificates__button"
        onClick={() => setIsAdd(!isAdd)}
      >
        {isAdd ? Button.Back : Button.Add}
      </button>
      {retrievedData && retrievedData.length > 0
        ? (<ul className="certificates__list">
          {retrievedData.map(certificate => (
            <NavLink
              to={`/certify-portal/${certificate.id}`}
              className={({ isActive }) =>
                classNames(classNames("certificates__name", {
                  "certificates__name--active": isActive,
                }))
              }
              key={certificate.id}
            >
              {certificate.CommonName}
            </NavLink>
          ))}
        </ul>
        ) : (
          <h2 className="certificates__title">
            Немає жодного сертифікату
          </h2>
        )}
    </div>
  )
};
