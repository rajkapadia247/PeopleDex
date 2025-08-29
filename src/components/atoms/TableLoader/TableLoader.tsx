import { type FunctionComponent } from "react";
import "./TableLoader.css";

interface TableLoaderProps {
  rows?: number;
}

const TableLoader: FunctionComponent<TableLoaderProps> = ({ rows = 5 }) => {
  return (
    <div className="table-loader-container">
      <div className="table-loading-container">
        {[...Array(rows)].map((_, index) => (
          <div key={index} className="table-loading-item">
            <div
              className="skeleton skeleton-circle"
              style={{ width: 40, height: 40 }}
            ></div>
            <div style={{ flex: 1 }}>
              <div
                className="skeleton skeleton-text skeleton-text-large"
                style={{ width: `${60 + Math.random() * 30}%` }}
              ></div>
              <div
                className="skeleton skeleton-text"
                style={{ width: `${40 + Math.random() * 20}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TableLoader;
