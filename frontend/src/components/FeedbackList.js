import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaStar, FaStarHalfAlt, FaRegStar, FaEdit, FaTrash, FaSearch, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { format } from 'date-fns';

const FeedbackList = () => {
  const navigate = useNavigate();
  const [feedbacks, setFeedbacks] = useState([]);
  const [editingFeedback, setEditingFeedback] = useState(null);
  const [editRating, setEditRating] = useState(5);
  const [editComment, setEditComment] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [hoverRating, setHoverRating] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState("newest");
  const [expandedComments, setExpandedComments] = useState({});
  const itemsPerPage = 5;
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [feedbackToDelete, setFeedbackToDelete] = useState(null);

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const fetchFeedbacks = () => {
    axios.get("http://localhost:8070/api/feedback").then((response) => {
      setFeedbacks(response.data);
    });
  };

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    return (
      <div className="flex">
        {[...Array(fullStars)].map((_, i) => (
          <FaStar key={i} className="text-yellow-400" />
        ))}
        {hasHalfStar && <FaStarHalfAlt className="text-yellow-400" />}
        {[...Array(5 - fullStars - (hasHalfStar ? 1 : 0))].map((_, i) => (
          <FaRegStar key={i} className="text-yellow-400" />
        ))}
      </div>
    );
  };

  const handleEdit = (feedback) => {
    setEditingFeedback(feedback);
    setEditRating(feedback.rating);
    setEditComment(feedback.comment || "");
    setShowModal(true);
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:8070/api/feedback/${editingFeedback._id}`, {
        rating: editRating,
        comment: editComment
      });
      setShowModal(false);
      fetchFeedbacks();
      setSuccessMessage("Feedback updated successfully!");
      setShowSuccessModal(true);
      setTimeout(() => setShowSuccessModal(false), 3000); // Auto-hide after 3 seconds
    } catch (error) {
      console.error("Error updating feedback:", error);
      setSuccessMessage("Failed to update feedback");
      setShowSuccessModal(true);
      setTimeout(() => setShowSuccessModal(false), 3000);
    }
  };

  const handleDelete = (feedback) => {
    setShowDeleteModal(true);
    setFeedbackToDelete(feedback);
  };

  const confirmDelete = async () => {
    if (!feedbackToDelete) return;

    try {
      await axios.delete(`http://localhost:8070/api/feedback/${feedbackToDelete._id}`);
      fetchFeedbacks();
      setShowDeleteModal(false);
      setFeedbackToDelete(null);
      setSuccessMessage("Feedback deleted successfully!");
      setShowSuccessModal(true);
      setTimeout(() => setShowSuccessModal(false), 3000);
    } catch (error) {
      console.error("Error deleting feedback:", error);
      setSuccessMessage("Failed to delete feedback");
      setShowSuccessModal(true);
      setTimeout(() => setShowSuccessModal(false), 3000);
    }
  };

  const toggleComment = (feedbackId) => {
    setExpandedComments(prev => ({
      ...prev,
      [feedbackId]: !prev[feedbackId]
    }));
  };

  // Filter and sort feedbacks
  const filteredFeedbacks = feedbacks.filter(feedback =>
    feedback.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    feedback.comment?.toLowerCase().includes(searchTerm.toLowerCase())
  ).sort((a, b) => {
    if (sortOrder === "newest") return new Date(b.createdAt) - new Date(a.createdAt);
    if (sortOrder === "oldest") return new Date(a.createdAt) - new Date(b.createdAt);
    if (sortOrder === "highest") return b.rating - a.rating;
    return a.rating - b.rating;
  });

  // Calculate pagination
  const totalPages = Math.ceil(filteredFeedbacks.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentFeedbacks = filteredFeedbacks.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="bg-primary min-h-screen w-full flex flex-col items-center font-sans">
      {/* Fixed width container */}
      <div className="w-full max-w-7xl px-4 md:px-6 lg:px-8">
        {/* Header Section with improved spacing */}
        <div className="w-full text-center py-12">
          <h2 className="text-4xl md:text-5xl font-extrabold leading-tight text-background mb-4 animate-fadeIn">
            Customer Feedback
          </h2>
          <p className="text-lg md:text-xl text-background/80 mb-8">
            See what our customers are saying about our products
          </p>
          
          {/* Search and Filter Controls with improved layout */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-10">
            <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
              <div className="relative w-full md:w-96">
                <input
                  type="text"
                  placeholder="Search feedback..."
                  className="w-full bg-white/95 text-background px-4 py-3 rounded-full pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-accent border-2 border-accent/20 focus:border-accent transition-all duration-200"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
              
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="bg-white/95 text-background px-4 py-3 rounded-full border-2 border-accent/20 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent transition-all duration-200"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="highest">Highest Rating</option>
                <option value="lowest">Lowest Rating</option>
              </select>
            </div>
            
            <div className="flex gap-4 w-full md:w-auto">
              <button
                onClick={() => navigate('/feedback/new')}
                className="flex-1 md:flex-none bg-accent text-white font-bold px-6 py-3 rounded-full hover:bg-background transition-all duration-200 shadow-lg hover:shadow-xl text-base md:text-lg"
              >
                Add New Feedback
              </button>
              <button
                onClick={() => navigate('/feedback/user/:userId')}
                className="flex-1 md:flex-none bg-white/95 text-accent font-bold border-2 border-accent px-6 py-3 rounded-full hover:bg-background hover:text-white transition-all duration-200 shadow-lg hover:shadow-xl text-base md:text-lg"
              >
                My Feedbacks
              </button>
            </div>
          </div>
        </div>

        {/* Feedback Grid with improved spacing and animations */}
        <div className="grid gap-6 mb-8">
          {currentFeedbacks.map((feedback, index) => (
            <div
              key={feedback._id}
              className="bg-white/95 shadow-lg rounded-xl overflow-hidden border-2 border-accent/20 hover:border-accent hover:shadow-xl transition-all duration-300 animate-fadeIn"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="p-6">
                {/* Product and User Header */}
                <div className="flex items-start gap-4 mb-4 border-b border-accent/10 pb-4">
                  <div className="w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-xl bg-accent shadow-lg flex-shrink-0">
                    {feedback.productName.charAt(0).toUpperCase()}
                  </div>

                  <div className="flex-grow">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-xl font-semibold text-background">
                          {feedback.productName}
                        </h3>
                        <div className="flex items-center mt-1">
                          {renderStars(feedback.rating)}
                          <span className="ml-2 text-gray-600 text-sm font-medium">
                            {feedback.rating}/5
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex space-x-3 flex-shrink-0">
                        <button 
                          onClick={() => handleEdit(feedback)} 
                          className="text-accent hover:text-white bg-accent/10 hover:bg-accent p-2.5 rounded-full transition-all duration-200"
                          title="Edit feedback"
                        >
                          <FaEdit size={18} />
                        </button>
                        <button 
                          onClick={() => handleDelete(feedback)} 
                          className="text-red-500 hover:text-white bg-red-50 hover:bg-red-500 p-2.5 rounded-full transition-all duration-200"
                          title="Delete feedback"
                        >
                          <FaTrash size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* User Info and Comment Section */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center text-background font-semibold text-sm flex-shrink-0">
                    {feedback.userId ? 'U' : 'A'}
                  </div>
                  
                  <div className="flex-grow">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-medium text-background">
                        {feedback.userId ? 'User' : 'Anonymous'}
                      </span>
                      <span className="text-sm text-gray-500">
                        {format(new Date(feedback.createdAt), 'MMM d, yyyy')}
                      </span>
                    </div>
                    
                    {feedback.comment && (
                      <div className="relative">
                        <p className={`text-gray-700 text-base leading-relaxed ${
                          !expandedComments[feedback._id] && feedback.comment.length > 150
                            ? 'line-clamp-3'
                            : ''
                        }`}>
                          {feedback.comment}
                        </p>
                        {feedback.comment.length > 150 && (
                          <button
                            onClick={() => toggleComment(feedback._id)}
                            className="text-accent hover:text-background font-medium text-sm mt-2"
                          >
                            {expandedComments[feedback._id] ? 'Show less' : 'Read more'}
                          </button>
                        )}
                      </div>
                    )}
                    {!feedback.comment && (
                      <p className="text-gray-500 italic text-sm">No comments provided.</p>
                    )}

                    {/* Updated Time Display */}
                    <div className="mt-4 flex flex-wrap gap-2">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-background/10 text-background">
                        {format(new Date(feedback.createdAt), 'h:mm a')}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Improved Pagination Controls */}
        {filteredFeedbacks.length > itemsPerPage && (
          <div className="flex justify-center items-center space-x-2 my-8">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`p-2 rounded-full transition-all duration-200 ${
                currentPage === 1
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-accent/10 text-accent hover:bg-accent hover:text-white'
              }`}
            >
              <FaChevronLeft size={20} />
            </button>
            
            <div className="flex space-x-2">
              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPage(index + 1)}
                  className={`w-10 h-10 rounded-full font-medium transition-all duration-200 ${
                    currentPage === index + 1
                      ? 'bg-accent text-white shadow-lg'
                      : 'bg-white text-accent hover:bg-accent/10'
                  } border-2 border-accent/20 hover:border-accent`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
            
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className={`p-2 rounded-full transition-all duration-200 ${
                currentPage === totalPages
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-accent/10 text-accent hover:bg-accent hover:text-white'
              }`}
            >
              <FaChevronRight size={20} />
            </button>
          </div>
        )}

        {/* No Results Message */}
        {filteredFeedbacks.length === 0 && (
          <div className="text-center py-12 bg-white/95 rounded-xl shadow-lg border-2 border-accent/20 max-w-4xl mx-auto w-full">
            <p className="text-background text-xl mb-6">
              {searchTerm ? 'No feedback matching your search.' : 'No feedback available yet.'}
            </p>
            <button
              onClick={() => searchTerm ? setSearchTerm('') : navigate('/feedback/new')}
              className="bg-accent text-white font-bold px-8 py-3 rounded-full hover:bg-background transition-all duration-200 shadow-lg hover:shadow-xl text-lg"
            >
              {searchTerm ? 'Clear Search' : 'Be the First to Give Feedback'}
            </button>
          </div>
        )}

        {feedbacks.length === 0 && (
          <div className="text-center py-10 bg-white rounded-lg shadow-lg border-4 border-accent max-w-4xl mx-auto w-full">
            <p className="text-background text-xl mb-4">No feedback available yet.</p>
            <button
              onClick={() => navigate('/feedback/new')}
              className="bg-accent text-white font-bold px-6 py-3 rounded-full hover:bg-background transition shadow-lg text-lg"
            >
              Be the First to Give Feedback
            </button>
          </div>
        )}

        {/* Edit Modal with theme colors */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
            <div className="bg-primary p-6 rounded-lg w-full max-w-md shadow-xl border border-gray-200">
              <h2 className="text-2xl font-semibold text-background mb-5 text-center">
                Edit Feedback
              </h2>
              
              <div className="mb-4">
                <label className="block text-background font-medium mb-1">Product</label>
                <input
                  type="text"
                  value={editingFeedback.productName}
                  disabled
                  className="border rounded-lg p-2 w-full bg-gray-100"
                />
              </div>

              <div className="mb-4">
                <label className="block text-background font-medium mb-1">Rating</label>
                <div className="flex mb-2">
                  {[...Array(5)].map((_, index) => {
                    const starValue = index + 1;
                    return (
                      <FaStar
                        key={index}
                        size={30}
                        className={`cursor-pointer transition-colors ${
                          starValue <= (hoverRating || editRating)
                            ? "text-yellow-500"
                            : "text-gray-300"
                        }`}
                        onClick={() => setEditRating(starValue)}
                        onMouseEnter={() => setHoverRating(starValue)}
                        onMouseLeave={() => setHoverRating(null)}
                      />
                    );
                  })}
                </div>
                <span className="text-sm text-gray-600">{editRating} out of 5</span>
              </div>

              <div className="mb-4">
                <label className="block text-background font-medium mb-1">Comment</label>
                <textarea
                  value={editComment}
                  onChange={(e) => setEditComment(e.target.value)}
                  className="border rounded-lg p-2 w-full bg-white mb-4 focus:ring-2 focus:ring-accent focus:outline-none"
                  rows={4}
                />
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowModal(false)}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdate}
                  className="bg-background text-white py-2 px-4 rounded-lg hover:bg-accent transition-all"
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Success Message Modal */}
        {showSuccessModal && (
          <div className="fixed top-4 right-4 z-50 animate-slideIn">
            <div className={`p-4 rounded-lg shadow-lg border ${
              successMessage.includes("successfully") 
                ? "bg-green-100 border-green-500 text-green-700"
                : "bg-red-100 border-red-500 text-red-700"
            }`}>
              <div className="flex items-center">
                {successMessage.includes("successfully") ? (
                  <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
                  </svg>
                ) : (
                  <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
                  </svg>
                )}
                <p className="font-medium">{successMessage}</p>
              </div>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal with improved styling */}
        {showDeleteModal && (
          <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 animate-fadeIn">
            <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-xl border border-accent transform transition-all duration-300 scale-100">
              <div className="text-center">
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
                  <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
                  </svg>
                </div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  Confirm Deletion
                </h2>
                <p className="text-gray-500 mb-6">
                  Are you sure you want to delete this feedback? This action cannot be undone.
                </p>
              </div>
              
              <div className="flex justify-center space-x-3">
                <button
                  onClick={() => {
                    setShowDeleteModal(false);
                    setFeedbackToDelete(null);
                  }}
                  className="px-4 py-2 bg-white text-gray-800 rounded-lg hover:bg-gray-100 transition-colors duration-200 border border-gray-300 font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200 font-medium"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FeedbackList;
