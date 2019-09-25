import $ from 'jquery';
import 'jquery-mockjax';

$.mockjax({
    url: "/articles?include=tags,author&fields[articles]=title&fields[tags]=name&fields[users]=name,username",
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
                    tags: {
                        data: [
                            {
                                type: 'tags',
                                id: '1'
                            }
                        ]
                    },
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
                    tags: {
                        data: [
                            {
                                type: 'tags',
                                id: "1"
                            },
                            {
                                type: 'tags',
                                id: "2"
                            },
                            {
                                type: 'tags',
                                id: "3"
                            }
                        ]
                    
                    },
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
                    tags: {
                        data: [
                            {
                                type: 'tags',
                                id: '1'
                            }
                        ]
                    },
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
                type: 'tags',
                id: '1',
                attributes: {
                    name: 'tag1'
                }
            },
            {
                type: 'tags',
                id: '2',
                attributes: {
                    name: 'tag2'
                }
            },
            {
                type: 'tags',
                id: '3',
                attributes: {
                    name: 'tag3'
                }
            },
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
    url: "/articles?include=tags,author&fields[articles]=title&fields[tags]=name&fields[users]=name,username&filter=id != 11",
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
                    tags: {
                        data: [
                            {
                                type: 'tags',
                                id: '1'
                            }
                        ]
                    },
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
                    tags: {
                        data: [
                            {
                                type: 'tags',
                                id: "1"
                            },
                            {
                                type: 'tags',
                                id: "2"
                            },
                            {
                                type: 'tags',
                                id: "3"
                            }
                        ]
                    
                    },
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
                type: 'tags',
                id: '1',
                attributes: {
                    name: 'tag1'
                }
            },
            {
                type: 'tags',
                id: '2',
                attributes: {
                    name: 'tag2'
                }
            },
            {
                type: 'tags',
                id: '3',
                attributes: {
                    name: 'tag3'
                }
            },
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
    url: "/articles/10?include=author,author.articles,comments,comments.author&fields[articles]=title,content&fields[users]=name,username&fields[comments]=title,content,date",
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
    url: "/articles/11?include=author,author.articles,comments,comments.author&fields[articles]=title,content&fields[users]=name,username&fields[comments]=title,content,date",
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
