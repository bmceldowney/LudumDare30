/*

Queue.js

A function to represent a queue

Created by Stephen Morley - http://code.stephenmorley.org/ - and released under
the terms of the CC0 1.0 Universal legal code:

http://creativecommons.org/publicdomain/zero/1.0/legalcode

*/

/* Creates a new queue. A queue is a first-in-first-out (FIFO) data structure -
 * items are added to the end of the queue and removed from the front.
 */
"use strict";

function Queue(){
    this.queue = [];
    this.offset = 0;
}
Queue.prototype = {
    getLength: function() {
        return (this.queue.length - offset);
    },
    /**
     * Returns true if the queue is empty
     * @returns {boolean}
     */
    isEmpty: function() {
        return (this.queue.length == 0);
    },
    /**
     * Add item to queue
     * @param item
     */
    enqueue: function(item){
        this.queue.push(item);
    },
    /**
     * Removes item from queue.
     * @returns {*}
     */
    dequeue: function(){
        // if the queue is empty, return immediately
        if (queue.length == 0) return undefined;

        // store the item at the front of the queue
        var item = queue[offset];

        // increment the offset and remove the free space if necessary
        if (++ offset * 2 >= queue.length){
            queue  = queue.slice(offset);
            offset = 0;
        }

        // return the dequeued item
        return item;
    },
    /**
     * Return item but don't remove from queue.
     * @returns {*}
     */
    peak: function(){
        return (this.queue.length > 0 ? this.queue[offset] : undefined)
    }
};

module.exports = Queue;
