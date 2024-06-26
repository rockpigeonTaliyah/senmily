import React, { useEffect, useState } from 'react';
import { Image, ScrollShadow } from "@nextui-org/react";

export const BooksTab = (props: any) => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        // Define an async function to fetch the books
        const fetchBooks = async () => {
            try {
                const response = await fetch('/api/books/getTemplates',{
                    method: 'GET',
                    headers: {
                    'Content-Type': 'application/json',
                    },
                });
                
                // Assuming the API returns the JSON in the format {books: [...]}
                const data = await response.json();
                console.log("data  ",data);
                if (data) {
                    setBooks(data);
                }
                // console.log(data)
            } catch (error) {
                console.error("Failed to fetch books:", error);
            }
        };

        // Call the fetchBooks function
        fetchBooks();
    }, []); // Empty dependency array means this effect runs once, similar to componentDidMount

    return (
        <ScrollShadow className="w-full h-[80vh]">
            {books.map((book, index) => (
                <div className="m-auto mb-2 flex justify-center items-center" key={index} onClick={(e) => props.func(e, book)}>
                    <Image
                        loading="eager"
                        alt={book.title || "Book cover"}
                        className={`z-0 w-[200px] h-full object-cover ${props.bid === book.bid ? "rounded-lg border-slate-300 border-4" : ""}`}
                        src={"https://senmily-resource.s3.ap-southeast-1.amazonaws.com/"+book.coverImage}
                    />
                </div>
            ))}
        </ScrollShadow>
    );
}