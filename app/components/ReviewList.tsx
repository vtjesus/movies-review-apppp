import React from "react";
import { Review } from "../types";

interface ReviewListProps {
  reviews: Review[];
  onDeleteReview: (reviewId: number) => void;
  onUpdateReview: (review: Review) => void;
}

const ReviewList: React.FC<ReviewListProps> = ({
  reviews,
  onDeleteReview,
  onUpdateReview,
}) => {
  
  if (reviews.length == 0) {
    return (
      <div className="flex items-center justify-center text-3xl text-gray-700 h-[50vh]">
        No reviews yet.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {reviews.map((review) => (
        <div
          key={review.id}
          className="bg-white p-4 border-2 border-gray-300 text-gray-500"
        >
          <div className="flex justify-between mb-2">
            <p className="font-bold">{review.comment}</p>
            <p className="text-lg font-bold text-purple-700">
              {review.rating}/10
            </p>
          </div>

          <div className="flex justify-between">
            <p className="font-semibold italic">By {review.reviewer}</p>
            <div className="flex justify-end">
              <button
                className=" hover:bg-purple-200 hover:rounded mr-2 h-5 w-5"
                onClick={(e) => {
                  e.stopPropagation();
                  onUpdateReview(review);
                }}
              >
                <svg
                  width="20px"
                  height="20px"
                  viewBox="0 0 1024 1024"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill="grey"
                    d="M832 512a32 32 0 1 1 64 0v352a32 32 0 0 1-32 32H160a32 32 0 0 1-32-32V160a32 32 0 0 1 32-32h352a32 32 0 0 1 0 64H192v640h640V512z"
                  />
                  <path
                    fill="grey"
                    d="m469.952 554.24 52.8-7.552L847.104 222.4a32 32 0 1 0-45.248-45.248L477.44 501.44l-7.552 52.8zm422.4-422.4a96 96 0 0 1 0 135.808l-331.84 331.84a32 32 0 0 1-18.112 9.088L436.8 623.68a32 32 0 0 1-36.224-36.224l15.104-105.6a32 32 0 0 1 9.024-18.112l331.904-331.84a96 96 0 0 1 135.744 0z"
                  />
                </svg>
              </button>
              <button
                className=" hover:bg-purple-200 hover:rounded mr-2 h-5 w-5"
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteReview(review.id);
                }}
              >
                <svg
                  width="20px"
                  height="20px"
                  viewBox="0 0 1024 1024"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill="grey"
                    d="M352 192V95.936a32 32 0 0 1 32-32h256a32 32 0 0 1 32 32V192h256a32 32 0 1 1 0 64H96a32 32 0 0 1 0-64h256zm64 0h192v-64H416v64zM192 960a32 32 0 0 1-32-32V256h704v672a32 32 0 0 1-32 32H192zm224-192a32 32 0 0 0 32-32V416a32 32 0 0 0-64 0v320a32 32 0 0 0 32 32zm192 0a32 32 0 0 0 32-32V416a32 32 0 0 0-64 0v320a32 32 0 0 0 32 32z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReviewList;
