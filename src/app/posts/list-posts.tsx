'use client';

import { useState, useEffect, Fragment } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import Link from "next/link";
import useAxiosInstance from '@/tools/api';

interface Post {
    id: string;
    title: string;
    description: string;
    tags: string[];
}

interface PaginationData {
    current_page: number;
    total_page: number;
    page_size: number;
    total: number;
}

export default function ListPost() {
    const axiosInstance = useAxiosInstance();
    const [posts, setPosts] = useState<Post[]>([]);
    const [tag, setTags] = useState<any>([]);
    const [title, setTitle] = useState<any>([]);
    const [titleSelected, setTitleSelected] = useState<string>("");
    const [pagination, setPagination] = useState<PaginationData>({
        current_page: 1,
        total_page: 1,
        page_size: 10,
        total: 0
    });
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const fetchPostsData = async () => {
            setLoading(true);
            try {
                const response = await axiosInstance.get('/posts', {
                    params: { 
                        page: pagination.current_page,
                        title: titleSelected,
                    }
                });
                setPosts(response.data.posts);
                const uniqueTitles = Array.from(new Set(response.data.posts.map((post: Post) => post.title)));
                setTitle(uniqueTitles);
                setPagination({
                    current_page: response.data.current_page,
                    total_page: response.data.total_page,
                    page_size: response.data.page_size,
                    total: response.data.total
                });
            } catch (error) {
                console.error('Failed to fetch posts:', error);
            } finally {
                setLoading(false);
            }
        };

        const fetchPostTagsData = async () => {
            setLoading(true);
            try {
                const response = await axiosInstance.get('/posts/tags');
                setTags(response.data);
                console.log(tag);
                
            } catch (error) {
                console.error('Failed to fetch tags:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPostsData();
        fetchPostTagsData();
    }, [pagination.current_page, titleSelected]);

    const handlePageChange = (page: number) => {
        if (page > 0 && page <= pagination.total_page) {
            setPagination(prev => ({ ...prev, current_page: page }));
        }
    };

    return (
        <div className='flex-1 py-4 px-2 lg:px-20 lg:mt-28'>
            <div className='lg:flex items-center lg:justify-between'>
                <Link href="/posts/add">
                    <button className="btn btn-primary w-full lg:max-w-60 mb-8">Add new</button>
                </Link>
                <div className='lg:flex'>
                    <div className="md:min-w-32 lg:min-w-60 mb-8 lg:px-2">
                        <Listbox value={tag} onChange={setTags}>
                            <div className="relative mt-1 z-40">
                                <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                                    <span className="block truncate">Title</span>
                                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                        <ChevronUpDownIcon
                                            className="h-5 w-5 text-gray-400"
                                            aria-hidden="true"
                                        />
                                    </span>
                                </Listbox.Button>
                                <Transition
                                    as={Fragment}
                                    leave="transition ease-in duration-100"
                                    leaveFrom="opacity-100"
                                    leaveTo="opacity-0"
                                >
                                    <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                                        <Listbox.Option
                                                className={({ active }) =>
                                                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                                        active ? 'bg-3 text-white' : 'text-gray-900'
                                                    }`
                                                }
                                                value={tag}
                                            >
                                                <span
                                                    className={'block truncate font-normal'}
                                                    onClick={() => setTitleSelected("")}
                                                >
                                                    All
                                                </span>
                                        </Listbox.Option>
                                        {title.map((title: string, titleIdx: number) => (
                                                <Listbox.Option
                                                    key={titleIdx}
                                                    className={({ active }) =>
                                                        `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                                            active ? 'bg-3 text-white' : 'text-gray-900'
                                                        }`
                                                    }
                                                    value={title}
                                                >
                                                    {({ selected }) => (
                                                        <>
                                                            <span
                                                                className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}
                                                                onClick={() => setTitleSelected(title)}
                                                            >
                                                                {title}
                                                            </span>
                                                            {selected ? (
                                                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                                                    <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                                </span>
                                                            ) : null}
                                                        </>
                                                    )}
                                                </Listbox.Option>
                                        ))}
                                    </Listbox.Options>
                                </Transition>
                            </div>
                        </Listbox>
                    </div>
                    
                </div>
            </div>
            {/* Loading Indicator */}
            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <svg className="animate-spin h-10 w-10 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path d="M4 12a8 8 0 118 8v-2a6 6 0 10-6-6H4z" fill="currentColor" />
                    </svg>
                </div>
            ) : (
                <>
                    {/* Table */}
                    <table className="min-w-full border-collapse border border-black bg-[#D9D9D9]">
                        <thead>
                            <tr>
                                <th className="border border-black px-4 py-2">ID</th>
                                <th className="border border-black px-4 py-2">Title</th>
                                <th className="border border-black px-4 py-2">Description</th>
                                <th className="border border-black px-4 py-2">Tags</th>
                                <th className="border border-black px-4 py-2" colSpan={2}>Actions</th>
                            </tr>
                        </thead>
                        <tbody className='text-center'>
                            {posts.map(post => (
                                <tr key={post.id}>
                                    <td className="border border-black px-4 py-2">{post.id}</td>
                                    <td className="border border-black px-4 py-2">{post.title}</td>
                                    <td className="border border-black px-4 py-2">{post.description}</td>
                                    <td className="border border-black px-4 py-2">
                                        {Array.isArray(post.tags) ? post.tags.join(', ') : 'No tags'}
                                    </td>
                                    <td className="border border-black px-4 py-2">
                                        <button className="p-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                                                <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828zM4 12v4h4v-4H4z" />
                                            </svg>
                                        </button>
                                        <button className="p-2 ml-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H3a1 1 0 100 2h1v10a2 2 0 002 2h8a2 2 0 002-2V6h1a1 1 0 100-2h-2V3a1 1 0 00-1-1H6zm3 4a1 1 0 112 0v8a1 1 0 11-2 0V6zm4 0a1 1 0 112 0v8a1 1 0 11-2 0V6z" clipRule="evenodd" />
                                            </svg>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {/* Pagination Controls */}
                    <div className="flex justify-center mt-4">
                        <button
                            onClick={() => handlePageChange(pagination.current_page - 1)}
                            disabled={pagination.current_page <= 1}
                            className="px-4 py-2 border rounded bg-gray-300 hover:bg-gray-400"
                        >
                            Previous
                        </button>
                        <span className="px-4 py-2">
                            Page {pagination.current_page} of {pagination.total_page}
                        </span>
                        <button
                            onClick={() => handlePageChange(pagination.current_page + 1)}
                            disabled={pagination.current_page >= pagination.total_page}
                            className="px-4 py-2 border rounded bg-gray-300 hover:bg-gray-400"
                        >
                            Next
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}
