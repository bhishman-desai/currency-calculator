"use client";
import { useEffect, useState } from "react";
import { Denominations } from "../../types";
import Image from "next/image";

const initialDenominationOrder = [
  "100",
  "50",
  "20",
  "10",
  "5",
  "2",
  "1",
  "0.5",
  "0.25",
  "0.1",
  "0.05",
  "0.01",
];

const initialDenominationValue: Denominations = {
  "100": 0,
  "50": 0,
  "20": 0,
  "10": 0,
  "5": 0,
  "2": 0,
  "1": 0,
  "0.5": 0,
  "0.25": 0,
  "0.1": 0,
  "0.05": 0,
  "0.01": 0,
};

export default function Home() {
  const [counts, setCounts] = useState(initialDenominationValue);
  const [totalCurrencyCount, setTotalCurrencyCount] = useState(0);

  const handleInputChange = (denomination: string, value: string) => {
    if (Number(value) < 0) {
      return;
    }

    setCounts((prevCounts) => ({
      ...prevCounts,
      [denomination as keyof Denominations]: value,
    }));
  };

  const countCurrentValue = (counts: Denominations): number => {
    return Object.entries(counts).reduce((total, [denomination, count]) => {
      const value = Number(denomination) * count;
      return total + value;
    }, 0);
  };

  useEffect(() => {
    setTotalCurrencyCount(countCurrentValue(counts));
  }, [counts]);

  return (
    <>
      <div className="flex items-center justify-center h-screen bg-gray-900 overflow-auto">
        <div className="bg-gray-800 p-8 rounded-lg mt-auto mb-6 shadow-lg w-4/5">
          <h1 className="text-2xl font-bold mb-6 text-white sticky top-5 w-52 rounded-lg bg-opacity-80 shadow-lg backdrop-blur-[1rem]">
            Currency Total {totalCurrencyCount.toFixed(2)}
          </h1>
          <div className="flex flex-col items-center ml-[-1rem]">
            {initialDenominationOrder.map((denomination) => (
              <div key={denomination} className="flex items-center mb-4">
                <Image
                  src={`/${denomination}.png`} // Replace with your image path
                  alt={`${denomination} note`}
                  height={500}
                  width={500}
                  loading={"lazy"}
                  className="w-auto h-40 mb-2 mr-2"
                />
                <div className="flex items-center">
                  <button
                    className="bg-green-500 text-white p-2 rounded-l"
                    onClick={() =>
                      handleInputChange(
                        denomination,
                        String(
                          Number(counts[denomination as keyof Denominations]) +
                            1,
                        ),
                      )
                    }
                  >
                    +
                  </button>
                  <input
                    type="number"
                    value={counts[denomination as keyof Denominations]}
                    onChange={(e) =>
                      handleInputChange(denomination, e.target.value)
                    }
                    className="p-2 border border-gray-700 rounded w-20 text-white bg-gray-700 remove-arrows text-center"
                  />
                  <button
                    className="bg-red-500 text-white p-2 rounded-r"
                    onClick={() =>
                      handleInputChange(
                        denomination,
                        String(
                          Math.max(
                            0,
                            Number(
                              counts[denomination as keyof Denominations],
                            ) - 1,
                          ),
                        ),
                      )
                    }
                  >
                    -
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
