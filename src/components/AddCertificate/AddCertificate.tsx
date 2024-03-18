import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import * as pkijs from 'pkijs';
import * as asn1js from 'asn1js';

import { Loader } from '../Loader';
import { Certificate } from '../../Types';
import { addToLocalStorage, formattedDate } from '../../Helpers';
import "./AddCertificate.scss"

type Props = {
  setIsAdd: (v: boolean) => void;
}

export const AddCertificate: React.FC<Props> = ({ setIsAdd }) => {
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: async (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (!file) return;

      try {
        setIsLoading(true);
        const fileContents = await readFileContents(file);
        const parsedCertificate = parseCertificate(fileContents);
        if (parsedCertificate !== null) {
          setIsAdd(false)
          addToLocalStorage("certificates", parsedCertificate)
        } else {
          throw new Error('Failed to parse the certificate');
        }
      } catch (error) {
        setIsError(true)
        console.error('Error reading file:', error);
      } finally {
        setIsLoading(false);
      }
    },
  });

  const parseCertificate = (asn1Data: ArrayBuffer): Certificate | null => {
    try {
      const asn1 = asn1js.fromBER(asn1Data);
      const certificate = new pkijs.Certificate({ schema: asn1.result });

      const subjectName = certificate.subject.typesAndValues
        .map((typeAndValue) => typeAndValue.value.valueBlock.value)
      const issuerName = certificate.issuer.typesAndValues
        .map((typeAndValue) => typeAndValue.value.valueBlock.value)
      const validFrom = certificate.notBefore.value;
      const validTo = certificate.notAfter.value;

      const CommonName = subjectName[0];
      const IssuerCN = issuerName[0];

      return {
        id: Math.floor(Math.random() * 10000),
        CommonName,
        IssuerCN,
        certificateValidFrom: formattedDate(validFrom),
        certificateValidTo: formattedDate(validTo),
      };
    } catch (error) {
      console.error('Error parsing certificate:', error);
      return null;
    }
  };

  const readFileContents = (file: File) => {
    return new Promise<ArrayBuffer>((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (event) => {
        try {
          const arrayBuffer = event.target?.result as ArrayBuffer;
          resolve(arrayBuffer);
        } catch (error) {
          reject(error);
        }
      };
      reader.onerror = (error) => {
        reject(error);
      };
      reader.readAsArrayBuffer(file);
    });
  };

  return (
    <div className="add">

      {isLoading && <Loader />}

      {isLoading === false && (
        <>
          <div {...getRootProps({ className: 'dropzone' })}>
            <h1>Перетягніть файл сертифікату сюди</h1>
            <p>або</p>
            <button className="add__button">
              Виберіть через стандартний діалог
            </button>
            <input
              {...getInputProps()}
            />
            {isError && (
              <h2 className="add__wrong">
                Неправильна структура конверта сертифіката (очікується SEQUENCE)
              </h2>
            )}
          </div>
        </>
      )}
    </div>
  );
};
