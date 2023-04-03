import {useState} from 'react';

const PodcastInfo = (props) => {
    const [podcast, setPodcast] = useState('');
    // useState for selected podcast - string

    // Onclick event that selects the clicked button's podcast
        // Pass selected podcast up to form as an argument

    return (
        // Heading that displays either:
            // A "loading" message
            // An error message if necessary.
        <ul>
            <li>
                {/* // Podcast props
                         // Image
                         // Title
                         // Description
                         // Runtime 
                         // Button that selects this podcast*/}
            </li>
        </ul>
    )
}

export default PodcastInfo;