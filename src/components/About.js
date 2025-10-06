import React from 'react'

export default function About() {
  return (
    <div>
        <div class="accordion accordion-flush" id="accordionFlushExample" style={{marginTop:"50px"}}>
            <div class="accordion-item">
                <h2 class="accordion-header">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                    What is E-Library?
                </button>
                </h2>
                <div id="flush-collapseOne" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                <div class="accordion-body">Welcome to E-Library – your personal digital bookshelf! Discover, search, and enjoy your favorite books anytime, anywhere. No heavy bags, no limits – just endless reading at your fingertips.</div>
                </div>
            </div>
            <div class="accordion-item">
                <h2 class="accordion-header">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
                    Key Features
                </button>
                </h2>
                <div id="flush-collapseTwo" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                <div class="accordion-body">
                    <ul>
                        <li>📚 Search Books – Quickly find books by title using the search bar.</li>
                        <li>📝 Journal – Maintain your personal reading journal.</li>
                        <li>✨ Highlights & Notes – Save important quotes and notes while reading.</li>
                        <li>📖 Book Viewer – A clean and responsive reading experience.</li>
                        <li>📱 Responsive Design – Works seamlessly across devices.</li>
                    </ul>
                </div>
                </div>
            </div>
            <div class="accordion-item">
                <h2 class="accordion-header">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
                    Why Choose Us?
                </button>
                </h2>
                <div id="flush-collapseThree" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                <div class="accordion-body">
                    <ul>
                        <li>Accessible anytime, anywhere.</li>
                        <li>Saves space compared to physical libraries.</li>
                        <li>Built with simplicity and ease of use in mind.</li>
                        <li>Encourages reading and personal knowledge management.</li>
                    </ul>
                </div>
                </div>
            </div>
            <div className="accordion-item">
                <h2 className="accordion-header" id="flush-headingFour">
                    <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#flush-collapseFour"
                    aria-expanded="false"
                    aria-controls="flush-collapseFour"
                    >
                    Our Mission
                    </button>
                </h2>
                <div
                    id="flush-collapseFour"
                    className="accordion-collapse collapse"
                    aria-labelledby="flush-headingFour"
                    data-bs-parent="#accordionFlushExample"
                >
                    <div className="accordion-body">
                    To make reading enjoyable, interactive, and accessible to everyone by combining the power of technology with the love for books. Dive into a library of <strong>80,000+ digital books</strong> anytime, anywhere.
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}