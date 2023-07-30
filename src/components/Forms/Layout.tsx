import React from 'react';
import Input from './components/Input';
import { FieldType } from '../../utils/enums';

const fieldMap: Record<string, any> = {
  [FieldType.Input]: Input
};

type AppProps = {
  fields: Array<Record<string, any>>;
  className?: string;
  loading?: boolean;
};

const Layout: React.FC<AppProps> = ({ fields, loading, className = '' }) => {
  return (
    <div className={className}>
      {fields.map((field, index) => {
        const Component = fieldMap[field.type];
        return (
          <>
            <Component key={index} loading={loading} {...field} />
          </>
        );
      })}
    </div>
  );
};

export default Layout;
