/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import format from 'date-fns/format';
import parseISO from 'date-fns/parseISO';
import { Deserializer } from 'jsonapi-serializer';
import companiesApi from '../../api/companies';
import useAuth from '../../hooks/useAuth';
import useOption from '../../hooks/useOption';
import Loading from '../Loading';

export default function CompanyCard({ company }) {
  const [companyResource, setCompanyResource] = useState({});
  const [loading, setLoading] = useState(false);
  const { currentUser: { access_token: accessToken } } = useAuth();
  const { option } = useOption();
  const { summary, summaryStats } = companyResource;

  useEffect(() => {
    setLoading(true);
    companiesApi.getCompany(company.id, accessToken)
      .then((data) => {
        new Deserializer({ keyForAttribute: 'camelCase' })
          .deserialize(data, (_error, companyData) => setCompanyResource(companyData));
      })
      .catch((error) => console.log(error)) // Optional since it was not requested in the exam
      .finally(() => setLoading(false));
  }, [accessToken, company]);

  return (
    <li>
      <article className="company-main-content">
        <h2 className="overlay">{company.name}</h2>
        <p className="overlay">
          Founded by
          {' '}
          {company.founder}
          {' '}
          on
          {' '}
          {format(parseISO(company.foundedAt), 'PPP')}
        </p>
        <img src={company.imageUrl} alt={`${company.name} ship`} />
      </article>
      {loading ? (
        <div className="loading-sm-container">
          <Loading />
        </div>
      ) : (
        <section className="company-summary-content">
          {option === 'milestones' ? (
            <>
              <h3>{summary?.title}</h3>
              <span>{summary && format(parseISO(summary.happenedAt), 'PPP')}</span>
              <p>{summary?.excerpt}</p>
            </>
          ) : (
            <ul className="company-summary-stats">
              <li>
                <strong>Fecha primer vuelto tripulado</strong>
                :
                {' '}
                {summaryStats && format(parseISO(summaryStats.crewedFlightOn), 'PPP')}
              </li>
              <li>
                <strong>Tipo de vehículo</strong>
                :
                {' '}
                {summaryStats?.vehicleType}
              </li>
              <li>
                <strong>Altura máxima</strong>
                :
                {' '}
                {summaryStats?.maxAltitude}
                {' '}
                kms
              </li>
            </ul>
          )}
          <div className="company-btn">
            <Link to={`companies/${company.id}`}>Ver detalles</Link>
          </div>
        </section>
      )}
    </li>
  );
}
