export const EN = {
  translation: {
    songPreview: {
      title: 'Hello, :D',
      description: 'Select a song to listen to.'
    },
    searchBar: {
      placeholder: 'What do you want to listen to?'
    },
    songActions: {
      title: 'Options',
      deleteButton: 'Delete song',
      confirmDeleteDialog: {
        title: 'Delete song',
        description: 'Do you want to delete this song? This action is irreversible.',
        cancel: 'Cancel',
        confirm: 'Delete'
      },
      toasts: {
        errorMessages: {
          general: 'Failed to delete the song',
          noSongSelected: 'No song selected',
          cannotDeletePlayingSong: 'You cannot delete the song that is currently playing'
        },
        successMessages: {
          deleted: 'Song deleted successfully'
        }
      }
    },
    settings: {
      alert: 'Some songs may not be downloaded if the videos are private, deleted, or unavailable.',
      form: {
        preferences: {
          title: 'Settings',
          description: 'Configure your Openfy Music preferences.',
          fields: {
            defaultPlaylist: {
              title: 'Default Playlist',
              placeholder: 'Select a default playlist',
              label: 'Playlists',
              description: 'The selected playlist will be your main one.'
            },
            allowYTDLP: {
              label: 'Allow downloads using YT-DLP',
              description: 'Enables downloading MP3 songs from YouTube.',
              disclaimer: {
                title: 'Disclaimer',
                note1: 'You are responsible for using this feature.',
                note2: 'This player only acts as a graphical interface for open-source tools.',
                note3: 'Make sure you comply with your country’s copyright laws.',
                dependencyStatus: {
                  found: {
                    title: 'All set',
                    description:
                      'The required dependencies have been <1>detected</1>. No action is needed.'
                  },
                  missing: {
                    title: 'Missing dependencies',
                    description:
                      'Some <1>missing</1> dependencies were not detected.  <br />You can download them from this folder: <7>Open folder</7>'
                  }
                }
              },
              toasts: {
                success: {
                  message: 'Settings updated successfully'
                },
                errors: {
                  message: 'An error occurred while updating the settings'
                }
              }
            }
          },
          saveButton: 'Save'
        },
        lngs: {
          title: 'Change language',
          description: 'Change the language to your preference',
          selector: {
            placeholder: 'Select a language',
            label: 'Languages:'
          }
        },
        themes: {
          title: 'Themes',
          description: 'Choose your preferred theme.',
          selector: {
            placeholder: 'Select a theme',
            label: 'Colors'
          },
          toasts: {
            errors: {
              message: 'An ocurred a error to try change the theme'
            }
          },
          colors: {
            default: 'Default',
            options: {
              blue: 'Blue',
              green: 'Green',
              amber: 'Amber',
              rose: 'Rose',
              purple: 'Purple',
              fuchsia: 'Fuchsia',
              orange: 'Orange',
              teal: 'Teal',
              red: 'Red',
              yellow: 'Yellow'
            }
          },
          modes: {
            dark: 'Dark',
            light: 'Light',
            system: 'System'
          }
        }
      }
    },
    download: {
      backButton: 'Back',
      form: {
        download: {
          title: 'Download Songs',
          description: 'Enter the URL of the YouTube song or playlist',
          fields: {
            url: {
              title: 'Song URL',
              placeholder: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
              description: 'Enter the YouTube song URL'
            },
            type: {
              title: 'Download Type',
              selectorLabel: 'Download:',
              description: 'Choose to download the playlist or just the song.'
            },
            destinationPlaylist: {
              title: 'Download Playlist',
              placeholder: 'Select a download playlist',
              selectorLabel: 'Playlists',
              description: 'The selected playlist will receive the downloaded songs.'
            }
          },
          downloadTypes: {
            playlist: 'Playlist',
            normal: 'Only the song'
          }
        },
        downloadWarning: {
          description:
            'Some songs may not be downloaded if the videos are private, deleted, or unavailable.'
        },
        submitButton: 'Download'
      },
      downloadingMessage: 'We are downloading your songs, please wait...',
      notification: {
        title: 'Your song(s) have been downloaded!',
        body: 'Download completed successfully'
      },
      uiStates: {
        loading: 'Reading dependencies...',
        error: 'Failed to read dependencies.',
        missingDependencies: {
          title: 'Required dependencies not found.',
          button: 'Open dependency folder'
        }
      },
      toasts: {
        warning: {
          message: 'The song was partially downloaded. Some videos were private or unavailable.'
        },
        success: {
          message: 'Download completed successfully'
        },
        errors: {
          invalidUrl: 'The URL is invalid.',
          drmProtected: 'This content is protected by DRM and cannot be downloaded.',
          general: 'An error occurred while downloading. Please try again.'
        }
      }
    },
    playlistManager: {
      uiStates: {
        noPlaylists: 'No playlists available.'
      },
      selector: {
        label: 'Select a playlist'
      }
    },
    songList: {
      uiStates: {
        loading: 'Loading songs...',
        error: 'Error loading songs',
        noPlaylistSelected: 'Select or create a playlist',
        emptyPlaylist: 'This playlist has no songs',
        notFound: 'No songs matched your search'
      },
      toasts: {
        errors: {
          noSongsAvailable: 'No songs available'
        }
      }
    },
    playlistDialogs: {
      optionsMenu: {
        title: 'Options',
        create: {
          title: 'New Playlist',
          description: 'Create a new playlist for your songs.',
          label: 'New Playlist',
          cancel: 'Cancel',
          confirm: 'Create',
          form: {
            fields: {
              name: {
                title: 'Playlist Name',
                placeholder: 'New playlist'
              }
            }
          },
          toasts: {
            errors: {
              message: 'An ocurred a error to try create playlist'
            },
            success: {
              message: 'Playlist added'
            }
          }
        },
        rename: {
          title: 'Rename Playlist',
          description: 'Do you want to rename this playlist? Enter the new name below.',
          label: 'Rename',
          cancel: 'Cancel',
          confirm: 'Save',
          form: {
            fields: {
              name: {
                title: 'Playlist Name',
                placeholder: 'New name'
              }
            }
          },
          toasts: {
            errors: {
              cannotRenameDefault: 'You cannot rename the default playlist',
              general: 'An ocurred a error to try rename this song'
            },
            success: {
              message: 'Playlist name updated successfully'
            }
          }
        },
        delete: {
          title: 'Delete playlist',
          description:
            'Do you want to delete this playlist? This action is irreversible. All songs in the playlist will be deleted.',
          label: 'Delete',
          cancel: 'Cancel',
          confirm: 'Confirm',
          toasts: {
            errors: {
              cannotDeleteDefault: 'You cannot delete the default playlist',
              cannotDeleteCurrent: 'You cannot delete the playlist you are currently viewing',
              general: 'Failed to delete the playlist'
            },
            success: {
              message: 'Playlist successfully deleted'
            }
          }
        }
      }
    },
    tooltips: {
      prevSong: 'Prev',
      paused: 'Pause',
      play: 'Play',
      nextSong: 'Next',
      toggleShuffle: 'Toggle shuffle',
      toggleLoop: 'Toggle loop',
      openFolder: 'Open the folder of playlist:'
    }
  }
}
