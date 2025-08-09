const mockReviews = [
    { id: 1, customer: "Asha", restaurant: "Spice Villa", rating: 4, comment: "Great!" },
    { id: 2, customer: "Rahul", restaurant: "Ocean Breeze", rating: 2, comment: "Too slow" },
  ];
  
  const ReviewList = () => {
    return (
      <div>
        <h4>Customer Reviews</h4>
        <table className="table table-bordered mt-3">
          <thead className="table-light">
            <tr>
              <th>#</th>
              <th>Customer</th>
              <th>Restaurant</th>
              <th>Rating</th>
              <th>Comment</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {mockReviews.map((r, i) => (
              <tr key={r.id}>
                <td>{i + 1}</td>
                <td>{r.customer}</td>
                <td>{r.restaurant}</td>
                <td>{r.rating}</td>
                <td>{r.comment}</td>
                <td>
                  <button className="btn btn-warning btn-sm me-2">Warn</button>
                  <button className="btn btn-danger btn-sm">Flag</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
  
  export default ReviewList;
  