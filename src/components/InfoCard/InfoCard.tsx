import { useParams } from "react-router-dom";
import "./InfoCard.scss"
import { readFromLocalStorage } from "../../Helpers";

export const InfoCard = () => {
  const { certificateId } = useParams();
  const retrievedData = readFromLocalStorage('certificates');

  let selectedTabsById;

  if (retrievedData) {
    selectedTabsById = retrievedData.find(test => test.id.toString() === certificateId);
  }

  return (
    <div className="info">
      <h1 className="info__title"><b>Common name:</b> {selectedTabsById?.CommonName}</h1>
      <h1 className="info__title"><b>Issuer CN:</b> {selectedTabsById?.IssuerCN}</h1>
      <h1 className="info__title"><b>Valid from:</b> {selectedTabsById?.certificateValidFrom}</h1>
      <h1 className="info__title"><b>Valid to:</b> {selectedTabsById?.certificateValidTo}</h1>
    </div>
  )
}