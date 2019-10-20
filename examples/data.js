import $ from 'jquery';
import 'jquery-mockjax';

$.mockjax({
    url: "/articles?include=author&fields[articles]=title&fields[users]=name,username",
    responseTime: 50,
    responseText: {
        data: [
            {
                type: "articles",
                id: "9",
                attributes: {
                    title: "Article 9"
                },
                relationships: {
                    author: {
                        data: {
                            type: 'users',
                            id: '1'
                        }
                    }
                }
            },
            {
                type: "articles",
                id: "10",
                attributes: {
                    title: "Article 10"
                },
                relationships: {
                    author: {
                        data: {
                            type: 'users',
                            id: '1'
                        }
                    }
                
                }
            },
            {
                type: "articles",
                id: "11",
                attributes: {
                    title: "Article 11"
                },
                relationships: {
                    author: {
                        data: {
                            type: 'users',
                            id: '1'
                        }
                    }
                }
            },
        ],
        included: [
            {
                type: 'users',
                id: '1',
                attributes: {
                    name: 'John Doe',
                    username: 'jdoe'
                }
            }
        
        ]
    
    }
});


$.mockjax({
    url: "/articles?include=author&fields[articles]=title&fields[users]=name,username&filter=id != 11",
    responseTime: 50,
    responseText: {
        data: [
            {
                type: "articles",
                id: "9",
                attributes: {
                    title: "Article 9"
                },
                relationships: {
                    author: {
                        data: {
                            type: 'users',
                            id: '1'
                        }
                    }
                }
            },
            {
                type: "articles",
                id: "10",
                attributes: {
                    title: "Article 10"
                },
                relationships: {
                    author: {
                        data: {
                            type: 'users',
                            id: '1'
                        }
                    }
                
                }
            }
        ],
        included: [
            {
                type: 'users',
                id: '1',
                attributes: {
                    name: 'John Doe',
                    username: 'jdoe'
                }
            }
        
        ]
    
    }
});

$.mockjax({
    url: "/articles/10?include=author,author.articles,comments,comments.author&fields[articles]=content,title&fields[comments]=content,date,title&fields[users]=name,username",
    responseTime: 50,
    responseText: {
        data: {
            type: 'articles',
            id: '10',
            attributes: {
                title: "Article 10",
                content: "Lorem ipsum dolor sit amet"
            },
            relationships: {
                author: {
                    data: {
                        type: 'users',
                        id: '1',
                    }
                },
                comments: {
                    data: [
                        {
                            type: 'comments',
                            id: '1',
                        },
                    
                    ]
                }
            }
        },
        included: [
            {
                type: 'users',
                id: '1',
                attributes: {
                    name: 'John Doe',
                    username: 'jdoe'
                },
                relationships: {
                    articles: {
                        data: [
                            {
                                type: 'articles',
                                id: '9'
                            },
                            {
                                type: 'articles',
                                id: '10'
                            },
                            {
                                type: 'articles',
                                id: '11'
                            }
                        ],
                        links: {
                            related: "/users/1/articles",
                            self: "/users/1/relationships/articles"
                        }
                    },
                }
            },
            {
                type: 'articles',
                id: '9',
                attributes: {
                    title: 'Article 9',
                    content: 'Lorem ipsum dolor sit amet'
                }
            },
            {
                type: 'articles',
                id: '10',
                attributes: {
                    title: 'Article 10',
                    content: 'Lorem ipsum dolor sit amet'
                }
            },
            {
                type: 'articles',
                id: '11',
                attributes: {
                    title: 'Article 11',
                    content: 'Lorem ipsum dolor sit amet'
                }
            },
            {
                type: 'comments',
                id: '1',
                attributes: {
                    title: 'Comment 1',
                    content: 'Lorem ipsum...',
                    date: 'some date'
                },
                relationships: {
                    author: {
                        data: {
                            type: 'users',
                            id: '1'
                        }
                    }
                }
            }
        ]
    }

});


$.mockjax({
    url: "/articles/11?include=author,author.articles,comments,comments.author&fields[articles]=content,title&fields[comments]=content,date,title&fields[users]=name,username",
    responseTime: 50,
    responseText: {
        data: {
            type: 'articles',
            id: '11',
            attributes: {
                title: "Article 11",
                content: "Lorem ipsum dolor sit amet"
            },
            relationships: {
                author: {
                    data: {
                        type: 'users',
                        id: '1',
                    }
                },
                comments: {
                    data: [
                        {
                            type: 'comments',
                            id: '2',
                        },
                    
                    ]
                }
            }
        },
        included: [
            {
                type: 'users',
                id: '1',
                attributes: {
                    name: 'John Doe',
                    username: 'jdoe'
                },
                relationships: {
                    articles: {
                        data: [
                            {
                                type: 'articles',
                                id: '9'
                            },
                            {
                                type: 'articles',
                                id: '10'
                            },
                            {
                                type: 'articles',
                                id: '11'
                            }
                        ]
                    },
                }
            },
            {
                type: 'articles',
                id: '9',
                attributes: {
                    title: 'Article 9',
                    content: 'Lorem ipsum dolor sit amet'
                }
            },
            {
                type: 'articles',
                id: '10',
                attributes: {
                    title: 'Article 10',
                    content: 'Lorem ipsum dolor sit amet'
                }
            },
            {
                type: 'articles',
                id: '11',
                attributes: {
                    title: 'Article 11',
                    content: 'Lorem ipsum dolor sit amet'
                }
            },
            {
                type: 'comments',
                id: '2',
                attributes: {
                    title: 'Comment 1',
                    content: 'Lorem ipsum...',
                    date: 'some date'
                },
                relationships: {
                    author: {
                        data: {
                            type: 'users',
                            id: '1'
                        }
                    }
                }
            }
        ]
    }
});
