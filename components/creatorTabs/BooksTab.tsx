import React, { useEffect, useState } from 'react';
import { Image, ScrollShadow } from "@nextui-org/react";

export const BooksTab = (props: any) => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch('/api/books/getTemplates', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        // Assuming the API returns the JSON in the format {books: [...]}
        const data = await response.json();
        console.log("data  ",data); 

        // Check if data is an array, if not, wrap it in an array
        if (Array.isArray(data)) {
          setBooks(data);
        } else {
          setBooks([data]); // Wrap the single object in a new array
        }

        console.log(data)
      } catch (error) {
        console.error("Failed to fetch books:", error);
      }
    };

    fetchBooks();
  }, []);

    return (
        <ScrollShadow className="w-full h-[80vh]">
            {books.map((book, index) => (
                <div className="m-auto mb-2 flex justify-center items-center" key={index} onClick={(e) => props.func(e, book)}>
                    <Image
                        loading="eager"
                        alt={book.title || "Book cover"}
                        className={`z-0 w-[200px] h-full object-cover ${props.bid === book.id ? "rounded-lg border-slate-300 border-4" : ""}`}
                        src={"https://senmily-resource.s3.ap-southeast-1.amazonaws.com/"+book.coverImage}
                    />
                </div>
            ))}
        </ScrollShadow>
    );
}