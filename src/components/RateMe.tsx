import { type MouseEvent, useState } from "react";
import { FaComments } from "react-icons/fa";

type Props = {
  toggleModal: () => void;
};

/**
 * @TODO add email functionality
 */

export default function RateMe({ toggleModal }: Props) {
  const [rating, setRating] = useState(3);
  const [page, setPage] = useState(0);

  const toggle = () => {
    toggleModal();
    setTimeout(() => setPage(0), 100);
  };

  const submit = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (page === 0) setPage(1);
    else toggle();
  };

  return (
    <>
      <form
        method="dialog"
        className="modal-backdrop"
        onClick={() => setPage(0)}
      >
        <button>close</button>
      </form>
      <form method="dialog" className="modal-box h-1/2">
        <div className="card m-auto h-full text-neutral-content">
          {page === 0 && (
            <div className="card-body items-center gap-7 text-center">
              <h2 className="card-title text-2xl">
                What do you think about my resume?
              </h2>
              <FaComments className="text-8xl" />
              <p>
                I created this website to just put stuff on my resume/ have fun.
                Tell me what you think. I&apos;ll receive your response via
                email.
              </p>
              <div className="rating rating-lg">
                <input
                  checked={rating === 1}
                  type="radio"
                  name="rating-2"
                  className="mask mask-star hover:scale-110"
                  onClick={() => setRating(1)}
                  readOnly
                />
                <input
                  readOnly
                  checked={rating === 2}
                  type="radio"
                  name="rating-2"
                  className="mask mask-star hover:scale-110"
                  onClick={() => setRating(2)}
                />
                <input
                  readOnly
                  checked={rating === 3}
                  type="radio"
                  name="rating-2"
                  className="mask mask-star hover:scale-110"
                  onClick={() => setRating(3)}
                />
                <input
                  readOnly
                  checked={rating === 4}
                  type="radio"
                  name="rating-2"
                  className="mask mask-star hover:scale-110"
                  onClick={() => setRating(4)}
                />
                <input
                  readOnly
                  checked={rating === 5}
                  type="radio"
                  name="rating-2"
                  className="mask mask-star hover:scale-110"
                  onClick={() => setRating(5)}
                />
              </div>
            </div>
          )}
          {page === 1 && (
            <div className="card-body items-center gap-7 text-center">
              <h2 className="card-title text-2xl">
                Write your feedback here and hit submit
              </h2>
              <textarea className="h-full w-full" />
            </div>
          )}
          <div className="m-auto flex w-3/4 justify-around">
            <button className="btn" onClick={toggle}>
              Cancel
            </button>
            <button className="btn" onClick={submit}>
              Submit
            </button>
          </div>
        </div>
      </form>
    </>
  );
}
