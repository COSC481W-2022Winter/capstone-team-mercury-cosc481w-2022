import React from 'react';
import tagscss from '../components/tags.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTags } from '@fortawesome/free-solid-svg-icons'

const TagAdder = () => {
    return (
      <div>
         <label class="tag-name" for="tags"><FontAwesomeIcon icon={faTags} />Tags: </label>
         <select name="tags" id="tags" class="tag-list" multiple>
            <option value="Cat">Cat</option>
            <option value="Dog">Dog</option>
            <option value="Bird">Bird</option>
            <option value="Rabbit">Rabbit</option>
            <option value="Hedgehog">Hedgehog</option>
            <option value="Lizard">Lizard</option>
            <option value="Hamster">Hamster</option>
            <option value="Guinea Pig">Guinea Pig</option>
            <option value="Mouse">Mouse</option>
            <option value="Fish">Fish</option>
            <option value="Insect">Insect</option>
            <option value="Amphibian">Amphibian</option>
         </select>
      </div>
    );
}

export default TagAdder;