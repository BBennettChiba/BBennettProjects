import { useState } from "react";

export default function RateMe() {
  const [rating, setRating] = useState(3);
  return (
    <div className="container m-auto">
      <div className="card m-auto w-96 bg-neutral text-neutral-content">
        <div className="card-body items-center text-center">
          <h2 className="card-title">What do you think about my resume?</h2>
          <p>
            I created this website to just put stuff on my resume/ have fun.
            Tell me what you think. I&apos;ll receive your response via email.
          </p>
          <div className="rating rating-lg">
            <input
              checked={rating === 1}
              type="radio"
              name="rating-2"
              className="mask mask-star"
              onClick={() => setRating(1)}
            />
            <input
              checked={rating === 2}
              type="radio"
              name="rating-2"
              className="mask mask-star"
              onClick={() => setRating(2)}
            />
            <input
              checked={rating === 3}
              type="radio"
              name="rating-2"
              className="mask mask-star"
              onClick={() => setRating(3)}
            />
            <input
              checked={rating === 4}
              type="radio"
              name="rating-2"
              className="mask mask-star"
              onClick={() => setRating(4)}
            />
            <input
              checked={rating === 5}
              type="radio"
              name="rating-2"
              className="mask mask-star"
              onClick={() => setRating(5)}
            />
          </div>
          <button className="btn">Submit</button>
        </div>
      </div>
    </div>
  );
}
