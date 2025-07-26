export const ES = {
  translation: {
    songPreview: {
      title: 'Hola, :D',
      description: 'Selecciona una canción para escucharla.'
    },
    searchBar: {
      placeholder: '¿Qué quieres escuchar?'
    },
    songActions: {
      title: 'Opciones',
      deleteButton: 'Eliminar canción',
      confirmDeleteDialog: {
        title: 'Eliminar canción',
        description: '¿Deseas eliminar esta canción? Esta acción es irreversible.',
        cancel: 'Cancelar',
        confirm: 'Eliminar'
      },
      toasts: {
        errorMessages: {
          general: 'Error al eliminar la canción',
          noSongSelected: 'No hay ninguna canción seleccionada',
          cannotDeletePlayingSong: 'No puedes eliminar la canción que estas reproduciendo'
        },
        successMessages: {
          deleted: 'Canción eliminada'
        }
      }
    },
    settings: {
      alert:
        'Algunas canciones podrían no descargarse si los videos son privados, eliminados o no están disponibles.',
      form: {
        preferences: {
          title: 'Configuración',
          description: 'Configura tus preferencias de Openfy Music.',
          fields: {
            defaultPlaylist: {
              title: 'Playlist por defecto',
              placeholder: 'Selecciona una playlist por defecto',
              label: 'Playlists',
              description: 'La carpeta que escojas será tu playlist principal.'
            },
            allowYTDLP: {
              label: 'Permitir descargas por YT-DLP',
              description:
                'Esto habilita la opción de descargar canciones en formato MP3 desde YouTube.',
              disclaimer: {
                title: 'Aviso de responsabilidad',
                note1: 'El uso de esta funcionalidad es responsabilidad del usuario.',
                note2:
                  'Este reproductor solo actúa como un puente gráfico para herramientas de código abierto.',
                note3: 'Asegúrate de cumplir con las leyes de derechos de autor en tu país.',
                dependencyStatus: {
                  found: {
                    title: 'Todo listo',
                    description:
                      'Las dependencias necesarias han sido <1>detectadas</1>. No es necesario realizar ninguna acción.'
                  },
                  missing: {
                    title: 'Faltan dependencias',
                    description:
                      'No se detectaron algunas dependencias <1>faltantes</1>. <br /> Puedes descargarlas desde esta carpeta: <7>Abrir carpeta</7>'
                  }
                }
              },
              toasts: {
                success: {
                  message: 'Configuracion actualizada con exito'
                },
                errors: {
                  message: 'Ha ocurrido un error al actualizar la configuracion'
                }
              }
            }
          },
          saveButton: 'Guardar'
        },
        lngs: {
          title: 'Cambiar idioma',
          description: 'Cambiar el idioma a tu preferencia.',
          selector: {
            placeholder: 'Selecciona un idioma',
            label: 'Idiomas:'
          }
        },
        themes: {
          title: 'Temas',
          description: 'Selecciona el tema de tu preferencia.',
          selector: {
            placeholder: 'Selecciona un tema',
            label: 'Colores'
          },
          toasts: {
            errors: {
              message: 'Error al cambiar el tema'
            }
          },
          colors: {
            default: 'Por defecto',
            options: {
              blue: 'Azul',
              green: 'Verde',
              amber: 'Ámbar',
              rose: 'Rosa',
              purple: 'Violeta',
              fuchsia: 'Fucsia',
              orange: 'Naranja',
              teal: 'Verde azulado',
              red: 'Rojo',
              yellow: 'Amarillo'
            }
          },
          modes: {
            dark: 'Oscuro',
            light: 'Claro',
            system: 'Ordenador'
          }
        }
      }
    },
    download: {
      backButton: 'Volver',
      form: {
        download: {
          title: 'Descargar canciones',
          description: 'Ingresa la url de la canción o playlist de YouTube',
          fields: {
            url: {
              title: 'URL de la canción',
              placeholder: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
              description: 'Ingresa la url de la canción de YouTube'
            },
            type: {
              title: 'Tipo de descarga',
              selectorLabel: 'Descargar:',
              description:
                'Dependiendo del modo seleccionado se descargará la playlist o solo la canción.'
            },
            destinationPlaylist: {
              title: 'Playlist de descarga',
              placeholder: 'Selecciona una playlist de descarga',
              selectorLabel: 'Playlists',
              description: 'La playlist que escojas será donde se descargarán las canciones.'
            }
          },
          downloadTypes: {
            playlist: 'Playlist',
            normal: 'Solo la canción'
          }
        },
        downloadWarning: {
          description:
            'Algunas canciones podrían no descargarse si los videos son privados, eliminados o no están disponibles.'
        },
        submitButton: 'Descargar'
      },
      downloadingMessage: 'Estamos descargando tus canciones, por favor espera...',
      notification: {
        title: '¡Tus canción(es) han sido descargadas!',
        body: 'Descarganda completa con éxito'
      },
      uiStates: {
        loading: 'Leyendo dependencias...',
        error: 'Error al leer las dependencias.',
        missingDependencies: {
          title: 'No se encontraron las dependencias necesarias.',
          button: 'Abrir carpeta de dependencias'
        }
      },
      toasts: {
        warning: {
          message:
            'La canción se descargó parcialmente. Algunos videos eran privados o no estaban disponibles.'
        },
        success: {
          message: 'Descarganda completa con éxito'
        },
        errors: {
          invalidUrl: 'La URL es inválida.',
          drmProtected: 'El contenido está protegido por DRM y no se puede descargar.',
          general: 'Ocurrió un error al descargar la(s) canción(es). Intenta de nuevo.'
        }
      }
    },
    playlistManager: {
      uiStates: {
        noPlaylists: 'No hay playlists disponibles.'
      },
      selector: {
        label: 'Selecciona una playlist'
      }
    },
    songList: {
      uiStates: {
        loading: 'Cargando canciones...',
        error: 'Error al cargar las canciones',
        noPlaylistSelected: 'Selecciona o crea una playlist',
        emptyPlaylist: 'No hay canciones en esta playlist',
        notFound: 'No se encontraron canciones que coincidan con tu búsqueda'
      },
      toasts: {
        errors: {
          noSongsAvailable: 'No hay canciones disponibles'
        }
      }
    },
    playlistDialogs: {
      optionsMenu: {
        title: 'Opciones',
        create: {
          title: 'Nueva playlist',
          description: 'Crea una nueva playlist para tus canciones.',
          label: 'Nueva playlist',
          cancel: 'Cancelar',
          confirm: 'Crear',
          form: {
            fields: {
              name: {
                title: 'Nombre de la playlist',
                placeholder: 'Nuevo playlist'
              }
            }
          },
          toasts: {
            errors: {
              message: 'Ha ocurrido un error al crear la playlist'
            },
            success: {
              message: 'Playlist agregada'
            }
          }
        },
        rename: {
          title: 'Renombrar playlist',
          description: '¿Deseas renombrar esta playlist? Introduce el nuevo nombre de la playlist.',
          label: 'Renombrar',
          cancel: 'Cancelar',
          confirm: 'Guardar',
          form: {
            fields: {
              name: {
                title: 'Nombre de la playlist',
                placeholder: 'Nuevo nombre'
              }
            }
          },
          toasts: {
            errors: {
              cannotRenameDefault: 'No puedes renombrar la playlist por defecto',
              general: 'Ha ocurrido un error al intentar cambiar el nombre de la playlist'
            },
            success: {
              message: 'El nombre de la playlist ha sido actualizado'
            }
          }
        },
        delete: {
          title: 'Eliminar esta playlist',
          description:
            '¿Deseas eliminar esta playlist? Esta acción es irreversible. Todas las canciones de esta playlist serán eliminadas.',
          label: 'Eliminar',
          cancel: 'Cancelar',
          confirm: 'Confirmar',
          toasts: {
            errors: {
              cannotDeleteDefault: 'No puedes eliminar la playlist por defecto',
              cannotDeleteCurrent: 'No puedes eliminar la playlist que estás viendo actualmente',
              general: 'Error al eliminar la playlist'
            },
            success: {
              message: 'Playlist eliminada con éxito'
            }
          }
        }
      }
    },
    tooltips: {
      prevSong: 'Anterior',
      paused: 'Pausar',
      play: 'Reproducir',
      nextSong: 'Siguiente',
      toggleShuffle: 'Alternar aleatorio',
      toggleLoop: 'Alternar repetición',
      openFolder: 'Abrir la carpeta de la playlist:'
    }
  }
}
