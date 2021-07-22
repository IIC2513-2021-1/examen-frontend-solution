import React from 'react';
import format from 'date-fns/format';
import parseISO from 'date-fns/parseISO';

export default function CompanyMilestone({ milestone }) {
  return (
    <li className="company-milestone">
      <h3>{milestone.title}</h3>
      <span><strong>{format(parseISO(milestone.happenedAt), 'PPP')}</strong></span>
      <p>{milestone.excerpt}</p>
    </li>
  );
}
