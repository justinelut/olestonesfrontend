import React from 'react';

export default function serializeContent(content) {
  let html = '';
  let jsx = [];

  for (const item of content) {
    if (item.type) {
      switch (item.type) {
        case 'h1':
          html += `<h1 class="text-4xl font-bold">${item.children
            .map((child) => child.text)
            .join('')}</h1>`;
          jsx.push(
            <h1 className='text-4xl font-bold'>
              {item.children.map((child) => child.text)}
            </h1>
          );
          break;
        case 'h2':
          html += `<h2 class="text-2xl font-semibold">${item.children
            .map((child) => child.text)
            .join('')}</h2>`;
          jsx.push(
            <h2 className='text-2xl font-semibold'>
              {item.children.map((child) => child.text)}
            </h2>
          );
          break;
        case 'h3':
          html += `<h3 class="text-lg font-medium">${item.children
            .map((child) => child.text)
            .join('')}</h3>`;
          jsx.push(
            <h3 className='text-lg font-medium'>
              {item.children.map((child) => child.text)}
            </h3>
          );
          break;
        case 'h4':
          html += `<h4 class="text-lg font-medium">${item.children
            .map((child) => child.text)
            .join('')}</h4>`;
          jsx.push(
            <h4 className='text-lg font-medium'>
              {item.children.map((child) => child.text)}
            </h4>
          );
          break;
        case 'h5':
          html += `<h5 class="text-lg font-medium">${item.children
            .map((child) => child.text)
            .join('')}</h5>`;
          jsx.push(
            <h5 className='text-lg font-medium'>
              {item.children.map((child) => child.text)}
            </h5>
          );
          break;
        case 'h6':
          html += `<h6 class="text-lg font-medium">${item.children
            .map((child) => child.text)
            .join('')}</h6>`;
          jsx.push(
            <h6 className='text-lg font-medium'>
              {item.children.map((child) => child.text)}
            </h6>
          );
          break;
        case 'p':
          html += `<p class="my-4">${item.children
            .map((child) => child.text)
            .join('')}</p>`;
          jsx.push(
            <p className='my-4'>{item.children.map((child) => child.text)}</p>
          );
          break;
        case 'blockquote':
          html += `<blockquote class="my-4 px-4 border-l-4 border-gray-300 italic">${item.children
            .map((child) => child.text)
            .join('')}</blockquote>`;
          jsx.push(
            <blockquote className='my-4 px-4 border-l-4 border-gray-300 italic'>
              {item.children.map((child) => child.text)}
            </blockquote>
          );
          break;
        case 'upload':
          html += `<img class="my-4 w-full" src="${item.value.url}" alt="${item.value.alt}" />`;
          jsx.push(
            <img
              className='my-4 w-full'
              src={item.value.url}
              alt={item.value.alt}
            />
          );
          break;
        default:
          break;
      }
    } else if (item.text) {
      if (
        item.text === ''
      ) {
        // Empty paragraph or line break
        html += '<br/>';
        jsx.push(<br />);
      } else {
        // Regular text
        html += item.text;
        jsx.push(item.text);
      }
    } else if (item.children) {
      const serialized = serializeContent(item.children);
      html += serialized.html;
      jsx.push(...serialized.jsx);
    }
  }

  return { html, jsx };
}
