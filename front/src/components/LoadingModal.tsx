import React from 'react';
import { useSelector } from 'react-redux';

import { RootState } from '../store/rootReducer';

const LoadingModal = () => {
  const show = useSelector((state: RootState) => state.loading.show);

  if (!show) return <></>;

  return (
    <>
      <div
        className={`modal fade ${show ? 'show d-block' : 'd-none'}`}
        tabIndex={-1}
        role="dialog"
      >
        <div
          className="modal-dialog modal-dialog-centered d-flex align-items-center justify-content-center"
          role="document"
        >
          <div className="modal-content" style={{ width: '100px' }}>
            <div className="modal-body d-flex justify-content-center align-items-center">
              <div className="spinner-border text-primary" role="status"></div>
            </div>
          </div>
        </div>
      </div>
      <div className="modal-backdrop fade show custom-backdrop"></div>
    </>
  );
};

export default LoadingModal;
