import "./loaders.css";
import React from 'react';

const BuilderSkeleton = () => {
  return (
    <main className="skeleton__main">
        <div className="skeleton__center skeleton__flex--col">

            <div className="skeleton__head skeleton__color"></div>
            <div className="skeleton__flex--col skeleton__table">
                {
                    Array.from({length : 20}).map((_, index) => {
                        return (
                            <div className="skeleton__cell" key={index}>
                                <div className="cell__1 cell__height skeleton__color"></div>
                                <div className="cell__2 cell__height skeleton__color"></div>
                                <div className="cell__3 cell__height skeleton__color"></div>
                            </div>
                        )
                    })
                }
            </div>

        </div>
    </main>
  )
}

export default BuilderSkeleton;